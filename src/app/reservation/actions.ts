"use server";

import { prisma } from "@/lib/prisma";
import {
  readReservationFormData,
  validateReservationInput,
} from "@/lib/reservation-domain";

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

export async function createReservation(
  _prevState: CreateReservationState,
  formData: FormData,
): Promise<CreateReservationState> {
  const rawValues = readReservationFormData(formData);
  const validationResult = validateReservationInput(rawValues);

  if (!validationResult.success) {
    return buildErrorState(
      validationResult.message,
      validationResult.fieldErrors,
    );
  }

  try {
    await prisma.reservation.create({
      data: {
        fullName: validationResult.data.fullName,
        email: validationResult.data.email,
        reservationAt: validationResult.data.reservationAt,
        guestCount: validationResult.data.guestCount,
        notes: validationResult.data.notes || null,
      },
    });

    return {
      status: "success",
      message: "Your reservation request has been saved.",
      fieldErrors: {},
      submittedReservation: {
        fullName: validationResult.data.fullName,
        email: validationResult.data.email,
        date: validationResult.data.date,
        time: validationResult.data.time,
        guests: String(validationResult.data.guestCount),
        notes: validationResult.data.notes,
      },
    };
  } catch {
    return buildErrorState(
      "Something went wrong while saving your reservation.",
      {},
    );
  }
}
