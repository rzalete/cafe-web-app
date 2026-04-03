"use client";

import { ChangeEvent, FormEvent, useState } from "react";

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

const inputClassName =
  "mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-400";

type ReservationFormValues = {
  fullName: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

const initialFormValues: ReservationFormValues = {
  fullName: "",
  email: "",
  date: "",
  time: "",
  guests: "",
  notes: "",
};

export default function ReservationPage() {
  const [formValues, setFormValues] =
    useState<ReservationFormValues>(initialFormValues);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

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
          This is the first reservation form shell for the app. We are focusing
          on structure first, then we will connect validation and persistence in
          the next phase.
        </p>
      </section>

      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <form
          className="rounded-3xl border border-stone-800 bg-stone-900 p-8"
          aria-labelledby="reservation-form-heading"
          onSubmit={handleSubmit}
        >
          <div>
            <h2
              id="reservation-form-heading"
              className="text-2xl font-semibold"
            >
              Reservation details
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-stone-300">
              Capture the key information now. We will wire this form up in the
              next step.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-stone-200">
                Full name
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                autoComplete="name"
                required
                value={formValues.fullName}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-stone-200">Email</span>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                autoComplete="email"
                required
                value={formValues.email}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-stone-200">Date</span>
              <input
                type="date"
                name="date"
                required
                value={formValues.date}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-stone-200">Time</span>
              <select
                name="time"
                required
                value={formValues.time}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Select a time</option>
                <option value="09:00">09:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-stone-200">
                Number of guests
              </span>
              <select
                name="guests"
                required
                value={formValues.guests}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Select guest count</option>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5+ guests</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-stone-200">
                Special notes
              </span>
              <textarea
                name="notes"
                rows={4}
                placeholder="Allergies, seating preferences, or special requests"
                value={formValues.notes}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-stone-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone-400">
              Client-side and server-side handling will be added next.
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
            >
              Request reservation
            </button>
          </div>
        </form>

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
