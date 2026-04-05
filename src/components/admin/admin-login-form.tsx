"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/admin/login/actions";

const inputClassName =
  "mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-400";

const initialState = {
  status: "idle" as const,
  message: "",
};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {state.message}
        </div>
      ) : null}

      <label className="block">
        <span className="text-sm font-medium text-stone-200">Admin email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={inputClassName}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-stone-200">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className={inputClassName}
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in as admin"}
      </button>
    </form>
  );
}
