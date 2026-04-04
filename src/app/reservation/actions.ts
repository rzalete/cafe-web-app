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

const reservationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  date: z.string().trim().min(1, "Date is required."),
  time: z.string().trim().min(1, "Time is required."),
  guests: z
    .string()
    .trim()
    .min(1, "Number of guests is required.")
    .regex(/^\d+$/, "Number of guests is required."),
  notes: z
    .string()
    .trim()
    .max(500, "Special notes must be 500 characters or fewer."),
});

function getStringValue(formData: FormData, key: ReservationFormField) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
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

    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: {
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        date: fieldErrors.date?.[0],
        time: fieldErrors.time?.[0],
        guests: fieldErrors.guests?.[0],
        notes: fieldErrors.notes?.[0],
      },
      submittedReservation: null,
    };
  }

  const reservationAt = new Date(
    `${validatedFields.data.date}T${validatedFields.data.time}:00`,
  );

  if (Number.isNaN(reservationAt.getTime())) {
    return {
      status: "error",
      message: "Please enter a valid reservation date and time.",
      fieldErrors: {
        date: "Please enter a valid date.",
        time: "Please enter a valid time.",
      },
      submittedReservation: null,
    };
  }

  try {
    await prisma.reservation.create({
      data: {
        fullName: validatedFields.data.fullName,
        email: validatedFields.data.email,
        reservationAt,
        guestCount: Number(validatedFields.data.guests),
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
        guests: validatedFields.data.guests,
        notes: validatedFields.data.notes,
      },
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong while saving your reservation.",
      fieldErrors: {},
      submittedReservation: null,
    };
  }
}
