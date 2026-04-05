"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  getAdminSessionCookieName,
  verifyAdminSession,
} from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

const updateReservationStatusSchema = z.object({
  reservationId: z.string().trim().min(1, "Reservation id is required."),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELED"]),
});

export async function updateReservationStatus(formData: FormData) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(getAdminSessionCookieName())?.value;
  const adminSession = await verifyAdminSession(sessionToken);

  if (!adminSession) {
    redirect("/admin/login");
  }

  const validatedFields = updateReservationStatusSchema.safeParse({
    reservationId: formData.get("reservationId"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    throw new Error("Invalid reservation status update request.");
  }

  await prisma.reservation.update({
    where: {
      id: validatedFields.data.reservationId,
    },
    data: {
      status: validatedFields.data.status,
    },
  });

  revalidatePath("/admin/reservations");
}
