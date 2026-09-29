"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-near-black px-5">
      <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-5">
        <div className="mb-2 text-center">
          <span className="font-display text-3xl text-warm-white">momentsbymikkie</span>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-warm-white/50">Admin</p>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-warm-white/60">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            className="border border-warm-white/25 bg-transparent px-4 py-3 font-sans text-sm text-warm-white outline-none focus-visible:border-warm-white/60"
          />
        </label>

        {error ? <p className="font-sans text-xs text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="bg-warm-white px-4 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-near-black transition-opacity disabled:opacity-50"
        >
          {loading ? "Checking…" : "Log In"}
        </button>
      </form>
    </main>
  );
}
