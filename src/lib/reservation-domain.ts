import "server-only";

import { z } from "zod";
import {
  maxGuestCount,
  minGuestCount,
  reservationTimeOptions,
} from "@/lib/reservation-config";

export type ReservationFormField =
  | "fullName"
  | "email"
  | "date"
  | "time"
  | "guests"
  | "notes";

export type ReservationFormValues = Record<ReservationFormField, string>;

export type ValidatedReservation = {
  fullName: string;
  email: string;
  date: string;
  time: string;
  guestCount: number;
  notes: string;
  reservationAt: Date;
};

export type ReservationValidationResult =
  | {
      success: true;
      data: ValidatedReservation;
    }
  | {
      success: false;
      message: string;
      fieldErrors: Partial<Record<ReservationFormField, string>>;
    };

const allowedReservationTimes = new Set<string>(
  reservationTimeOptions.map((option) => option.value),
);

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

export function readReservationFormData(
  formData: FormData,
): ReservationFormValues {
  return {
    fullName: getStringValue(formData, "fullName"),
    email: getStringValue(formData, "email"),
    date: getStringValue(formData, "date"),
    time: getStringValue(formData, "time"),
    guests: getStringValue(formData, "guests"),
    notes: getStringValue(formData, "notes"),
  };
}

export function validateReservationInput(
  values: ReservationFormValues,
): ReservationValidationResult {
  const validatedFields = reservationSchema.safeParse(values);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: {
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        date: fieldErrors.date?.[0],
        time: fieldErrors.time?.[0],
        guests: fieldErrors.guests?.[0],
        notes: fieldErrors.notes?.[0],
      },
    };
  }

  const guestCount = Number.parseInt(validatedFields.data.guests, 10);

  if (
    !Number.isInteger(guestCount) ||
    guestCount < minGuestCount ||
    guestCount > maxGuestCount
  ) {
    return {
      success: false,
      message: `Reservations are limited to ${minGuestCount}-${maxGuestCount} guests.`,
      fieldErrors: {
        guests: `Please choose between ${minGuestCount} and ${maxGuestCount} guests.`,
      },
    };
  }

  if (!allowedReservationTimes.has(validatedFields.data.time)) {
    return {
      success: false,
      message: "Please select one of the available reservation times.",
      fieldErrors: {
        time: "Please choose one of the available reservation times.",
      },
    };
  }

  const reservationAt = buildReservationDateTime(
    validatedFields.data.date,
    validatedFields.data.time,
  );

  if (!reservationAt) {
    return {
      success: false,
      message: "Please enter a valid reservation date and time.",
      fieldErrors: {
        date: "Please enter a valid date.",
        time: "Please enter a valid time.",
      },
    };
  }

  if (reservationAt <= new Date()) {
    return {
      success: false,
      message: "Reservations must be scheduled for a future time.",
      fieldErrors: {
        date: "Choose a future date.",
        time: "Choose a future time.",
      },
    };
  }

  return {
    success: true,
    data: {
      fullName: validatedFields.data.fullName,
      email: validatedFields.data.email,
      date: validatedFields.data.date,
      time: validatedFields.data.time,
      guestCount,
      notes: validatedFields.data.notes,
      reservationAt,
    },
  };
}

function getStringValue(formData: FormData, key: ReservationFormField) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
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
