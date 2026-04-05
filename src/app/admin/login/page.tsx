import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <section className="mx-auto w-full max-w-2xl rounded-3xl bg-stone-900 px-8 py-12 shadow-2xl md:px-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Admin Access
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Sign in to manage cafe reservations.
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-stone-300">
          This login is temporary and environment-based. We will replace it with
          a proper auth system later.
        </p>

        <div className="mt-10">
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
