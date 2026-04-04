"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

type ReservationFormField =
  | "fullName"
  | "email"
  | "date"
  | "time"
  | "guests"
  | "notes";

type SubmittedReservation = {
  fullName: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

export type CreateReservationState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: Partial<Record<ReservationFormField, string>>;
  submittedReservation: SubmittedReservation | null;
};

const ALLOWED_RESERVATION_TIMES = new Set(["09:00", "11:00", "13:00", "15:00"]);
const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 6;

const reservationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  date: z.string().trim().min(1, "Date is required."),
  time: z.string().trim().min(1, "Time is required."),
  guests: z.string().trim().min(1, "Number of guests is required."),
  notes: z
    .string()
    .trim()
    .max(500, "Special notes must be 500 characters or fewer."),
});

function getStringValue(formData: FormData, key: ReservationFormField) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function buildErrorState(
  message: string,
  fieldErrors: Partial<Record<ReservationFormField, string>>,
): CreateReservationState {
  return {
    status: "error",
    message,
    fieldErrors,
    submittedReservation: null,
  };
}

function buildReservationDateTime(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  if (
    [year, month, day, hours, minutes].some((value) => Number.isNaN(value))
  ) {
    return null;
  }

  const reservationAt = new Date(year, month - 1, day, hours, minutes, 0, 0);

  if (
    reservationAt.getFullYear() !== year ||
    reservationAt.getMonth() !== month - 1 ||
    reservationAt.getDate() !== day ||
    reservationAt.getHours() !== hours ||
    reservationAt.getMinutes() !== minutes
  ) {
    return null;
  }

  return reservationAt;
}

export async function createReservation(
  _prevState: CreateReservationState,
  formData: FormData,
): Promise<CreateReservationState> {
  const rawValues = {
    fullName: getStringValue(formData, "fullName"),
    email: getStringValue(formData, "email"),
    date: getStringValue(formData, "date"),
    time: getStringValue(formData, "time"),
    guests: getStringValue(formData, "guests"),
    notes: getStringValue(formData, "notes"),
  };

  const validatedFields = reservationSchema.safeParse(rawValues);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    return buildErrorState("Please correct the highlighted fields.", {
      fullName: fieldErrors.fullName?.[0],
      email: fieldErrors.email?.[0],
      date: fieldErrors.date?.[0],
      time: fieldErrors.time?.[0],
      guests: fieldErrors.guests?.[0],
      notes: fieldErrors.notes?.[0],
    });
  }

  const guestCount = Number.parseInt(validatedFields.data.guests, 10);

  if (
    !Number.isInteger(guestCount) ||
    guestCount < MIN_GUEST_COUNT ||
    guestCount > MAX_GUEST_COUNT
  ) {
    return buildErrorState(
      `Reservations are limited to ${MIN_GUEST_COUNT}-${MAX_GUEST_COUNT} guests.`,
      {
        guests: `Please choose between ${MIN_GUEST_COUNT} and ${MAX_GUEST_COUNT} guests.`,
      },
    );
  }

  if (!ALLOWED_RESERVATION_TIMES.has(validatedFields.data.time)) {
    return buildErrorState("Please select one of the available reservation times.", {
      time: "Please choose one of the available reservation times.",
    });
  }

  const reservationAt = buildReservationDateTime(
    validatedFields.data.date,
    validatedFields.data.time,
  );

  if (!reservationAt) {
    return buildErrorState("Please enter a valid reservation date and time.", {
      date: "Please enter a valid date.",
      time: "Please enter a valid time.",
    });
  }

  if (reservationAt <= new Date()) {
    return buildErrorState("Reservations must be scheduled for a future time.", {
      date: "Choose a future date.",
      time: "Choose a future time.",
    });
  }

  try {
    await prisma.reservation.create({
      data: {
        fullName: validatedFields.data.fullName,
        email: validatedFields.data.email,
        reservationAt,
        guestCount,
        notes: validatedFields.data.notes || null,
      },
    });

    return {
      status: "success",
      message: "Your reservation request has been saved.",
      fieldErrors: {},
      submittedReservation: {
        fullName: validatedFields.data.fullName,
        email: validatedFields.data.email,
        date: validatedFields.data.date,
        time: validatedFields.data.time,
        guests: String(guestCount),
        notes: validatedFields.data.notes,
      },
    };
  } catch {
    return buildErrorState(
      "Something went wrong while saving your reservation.",
      {},
    );
  }
}
