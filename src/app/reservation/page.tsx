import { ReservationForm } from "@/components/reservation/reservation-form";

const reservationSteps = [
  {
    title: "Choose a schedule",
    description: "Pick the date, time, and party size for your visit.",
  },
  {
    title: "Share guest details",
    description: "Provide contact information so the booking can be confirmed.",
  },
  {
    title: "Confirm the request",
    description:
      "Review the reservation details before we connect real submission logic.",
  },
];

export default function ReservationPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <section className="mx-auto w-full max-w-5xl rounded-3xl bg-stone-900 px-8 py-12 shadow-2xl md:px-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Reservations
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Plan your cafe visit with a clear booking flow.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
          This reservation form now submits through a real server action. The
          next phase can build on this with availability rules and richer booking
          management.
        </p>
      </section>

      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
        <ReservationForm />

        <aside className="rounded-3xl border border-stone-800 bg-stone-900 p-8">
          <h2 className="text-2xl font-semibold">Booking flow</h2>
          <div className="mt-6 space-y-4">
            {reservationSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-stone-800 bg-stone-950 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-stone-950">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="mt-3 leading-7 text-stone-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
