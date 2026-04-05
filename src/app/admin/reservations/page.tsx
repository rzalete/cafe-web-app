import { logoutAdmin } from "@/app/admin/actions";
import { updateReservationStatus } from "@/app/admin/reservations/actions";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELED";

const reservationDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const createdAtFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function getStatusClassName(status: ReservationStatus) {
  switch (status) {
    case "CONFIRMED":
      return "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "CANCELED":
      return "border border-red-500/30 bg-red-500/10 text-red-300";
    case "PENDING":
    default:
      return "border border-amber-500/30 bg-amber-500/10 text-amber-300";
  }
}

function getStatusActions(status: ReservationStatus) {
  switch (status) {
    case "CONFIRMED":
      return [
        {
          label: "Mark as pending",
          value: "PENDING" as const,
          className:
            "border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20",
        },
        {
          label: "Cancel reservation",
          value: "CANCELED" as const,
          className:
            "border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20",
        },
      ];
    case "CANCELED":
      return [
        {
          label: "Mark as pending",
          value: "PENDING" as const,
          className:
            "border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20",
        },
        {
          label: "Confirm reservation",
          value: "CONFIRMED" as const,
          className:
            "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
        },
      ];
    case "PENDING":
    default:
      return [
        {
          label: "Confirm reservation",
          value: "CONFIRMED" as const,
          className:
            "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
        },
        {
          label: "Cancel reservation",
          value: "CANCELED" as const,
          className:
            "border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20",
        },
      ];
  }
}

export default async function AdminReservationsPage() {
  const adminSession = await requireAdminSession();

  const reservations = await prisma.reservation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <section className="mx-auto w-full max-w-6xl rounded-3xl bg-stone-900 px-8 py-12 shadow-2xl md:px-12 md:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Internal View
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Recent reservation requests
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">
              Signed in as {adminSession.adminEmail}. This page reads reservation
              records directly from PostgreSQL through Prisma in a Server Component.
            </p>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex rounded-full border border-stone-700 px-5 py-2.5 text-sm font-semibold text-stone-100 transition hover:border-stone-500 hover:bg-stone-800"
            >
              Sign out
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-6xl">
        {reservations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-700 bg-stone-900 p-10 text-center">
            <h2 className="text-2xl font-semibold">No reservations yet</h2>
            <p className="mt-3 text-stone-300">
              Once users submit the reservation form, records will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {reservations.map((reservation) => (
              <article
                key={reservation.id}
                className="rounded-3xl border border-stone-800 bg-stone-900 p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {reservation.fullName}
                    </h2>
                    <p className="mt-2 text-stone-300">{reservation.email}</p>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${getStatusClassName(
                      reservation.status,
                    )}`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-stone-950/40 p-4">
                    <dt className="text-sm text-stone-400">Reservation time</dt>
                    <dd className="mt-1 font-medium text-stone-100">
                      {reservationDateFormatter.format(reservation.reservationAt)}
                    </dd>
                  </div>

                  <div className="rounded-2xl bg-stone-950/40 p-4">
                    <dt className="text-sm text-stone-400">Guests</dt>
                    <dd className="mt-1 font-medium text-stone-100">
                      {reservation.guestCount}
                    </dd>
                  </div>

                  <div className="rounded-2xl bg-stone-950/40 p-4">
                    <dt className="text-sm text-stone-400">Submitted at</dt>
                    <dd className="mt-1 font-medium text-stone-100">
                      {createdAtFormatter.format(reservation.createdAt)}
                    </dd>
                  </div>
                </dl>

                {reservation.notes ? (
                  <div className="mt-4 rounded-2xl bg-stone-950/40 p-4">
                    <p className="text-sm text-stone-400">Special notes</p>
                    <p className="mt-1 leading-7 text-stone-100">
                      {reservation.notes}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3 border-t border-stone-800 pt-6">
                  {getStatusActions(reservation.status).map((action) => (
                    <form key={action.value} action={updateReservationStatus}>
                      <input
                        type="hidden"
                        name="reservationId"
                        value={reservation.id}
                      />
                      <input
                        type="hidden"
                        name="status"
                        value={action.value}
                      />
                      <button
                        type="submit"
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${action.className}`}
                      >
                        {action.label}
                      </button>
                    </form>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
