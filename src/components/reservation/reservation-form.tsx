"use client";

import { useActionState, useEffect, useRef } from "react";
import { createReservation } from "@/app/reservation/actions";
import type { CreateReservationState } from "@/app/reservation/actions";

const inputClassName =
  "mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-400";

const initialState: CreateReservationState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  submittedReservation: null,
};

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(
    createReservation,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="space-y-6">
      <form
        ref={formRef}
        className="rounded-3xl border border-stone-800 bg-stone-900 p-8"
        aria-labelledby="reservation-form-heading"
        action={formAction}
        noValidate
      >
        <div>
          <h2 id="reservation-form-heading" className="text-2xl font-semibold">
            Reservation details
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-stone-300">
            Enter the booking details below and we will save the request to the
            database.
          </p>
        </div>

        {state.status === "error" && state.message ? (
          <div
            className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
            aria-live="polite"
          >
            {state.message}
          </div>
        ) : null}

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
              aria-invalid={Boolean(state.fieldErrors.fullName)}
              aria-describedby={
                state.fieldErrors.fullName ? "fullName-error" : undefined
              }
              className={inputClassName}
            />
            {state.fieldErrors.fullName ? (
              <p id="fullName-error" className="mt-2 text-sm text-red-400">
                {state.fieldErrors.fullName}
              </p>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-stone-200">Email</span>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              autoComplete="email"
              required
              aria-invalid={Boolean(state.fieldErrors.email)}
              aria-describedby={
                state.fieldErrors.email ? "email-error" : undefined
              }
              className={inputClassName}
            />
            {state.fieldErrors.email ? (
              <p id="email-error" className="mt-2 text-sm text-red-400">
                {state.fieldErrors.email}
              </p>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-stone-200">Date</span>
            <input
              type="date"
              name="date"
              required
              aria-invalid={Boolean(state.fieldErrors.date)}
              aria-describedby={
                state.fieldErrors.date ? "date-error" : undefined
              }
              className={inputClassName}
            />
            {state.fieldErrors.date ? (
              <p id="date-error" className="mt-2 text-sm text-red-400">
                {state.fieldErrors.date}
              </p>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-stone-200">Time</span>
            <select
              name="time"
              required
              aria-invalid={Boolean(state.fieldErrors.time)}
              aria-describedby={
                state.fieldErrors.time ? "time-error" : undefined
              }
              className={inputClassName}
              defaultValue=""
            >
              <option value="">Select a time</option>
              <option value="09:00">09:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">01:00 PM</option>
              <option value="15:00">03:00 PM</option>
            </select>
            {state.fieldErrors.time ? (
              <p id="time-error" className="mt-2 text-sm text-red-400">
                {state.fieldErrors.time}
              </p>
            ) : null}
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-stone-200">
              Number of guests
            </span>
            <select
              name="guests"
              required
              aria-invalid={Boolean(state.fieldErrors.guests)}
              aria-describedby={
                state.fieldErrors.guests ? "guests-error" : undefined
              }
              className={inputClassName}
              defaultValue=""
            >
              <option value="">Select guest count</option>
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5 guests</option>
              <option value="6">6 guests</option>
            </select>
            {state.fieldErrors.guests ? (
              <p id="guests-error" className="mt-2 text-sm text-red-400">
                {state.fieldErrors.guests}
              </p>
            ) : null}
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-stone-200">
              Special notes
            </span>
            <textarea
              name="notes"
              rows={4}
              maxLength={500}
              placeholder="Allergies, seating preferences, or special requests"
              aria-invalid={Boolean(state.fieldErrors.notes)}
              aria-describedby={
                state.fieldErrors.notes ? "notes-error" : undefined
              }
              className={inputClassName}
            />
            {state.fieldErrors.notes ? (
              <p id="notes-error" className="mt-2 text-sm text-red-400">
                {state.fieldErrors.notes}
              </p>
            ) : null}
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-stone-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-400">
            Reservation requests are now saved on the server.
          </p>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Saving reservation..." : "Request reservation"}
          </button>
        </div>
      </form>

      {state.status === "success" && state.submittedReservation ? (
        <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Reservation saved
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-stone-50">
            Thanks, {state.submittedReservation.fullName}.
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-stone-200">
            {state.message}
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-stone-950/40 p-4">
              <dt className="text-sm text-stone-400">Email</dt>
              <dd className="mt-1 font-medium text-stone-100">
                {state.submittedReservation.email}
              </dd>
            </div>

            <div className="rounded-2xl bg-stone-950/40 p-4">
              <dt className="text-sm text-stone-400">Date</dt>
              <dd className="mt-1 font-medium text-stone-100">
                {state.submittedReservation.date}
              </dd>
            </div>

            <div className="rounded-2xl bg-stone-950/40 p-4">
              <dt className="text-sm text-stone-400">Time</dt>
              <dd className="mt-1 font-medium text-stone-100">
                {state.submittedReservation.time}
              </dd>
            </div>

            <div className="rounded-2xl bg-stone-950/40 p-4">
              <dt className="text-sm text-stone-400">Guests</dt>
              <dd className="mt-1 font-medium text-stone-100">
                {state.submittedReservation.guests}
              </dd>
            </div>
          </dl>

          {state.submittedReservation.notes ? (
            <div className="mt-4 rounded-2xl bg-stone-950/40 p-4">
              <p className="text-sm text-stone-400">Special notes</p>
              <p className="mt-1 leading-7 text-stone-100">
                {state.submittedReservation.notes}
              </p>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
