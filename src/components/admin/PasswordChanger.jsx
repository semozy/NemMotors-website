"use client";

import { useState } from "react";
import { Key, Loader2, Check } from "lucide-react";

export default function PasswordChanger() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password.length < 12) {
      return setError("Wachtwoord moet minimaal 12 tekens bevatten.");
    }
    if (password !== confirmation) {
      return setError("De wachtwoorden komen niet overeen.");
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setPassword("");
        setConfirmation("");
      } else {
        setError(data.error || "Er is een fout opgetreden.");
      }
    } catch {
      setError("Verbindingsfout opgetreden.");
    }
    setSaving(false);
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-black tracking-tight text-neutral-900">Mijn wachtwoord wijzigen</h2>
      <p className="mt-1 text-xs text-neutral-500">
        Stel hier op elk moment een nieuw, veilig wachtwoord in voor je eigen account.
      </p>

      {success && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800">
          <Check className="h-4 w-4" /> Wachtwoord is succesvol gewijzigd!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
        <label className="block w-full max-w-xs text-[11px] font-bold text-neutral-700">
          Nieuw wachtwoord
          <input
            type="password"
            required
            minLength={12}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 px-3 text-xs outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
          />
        </label>
        <label className="block w-full max-w-xs text-[11px] font-bold text-neutral-700">
          Herhaal wachtwoord
          <input
            type="password"
            required
            minLength={12}
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 px-3 text-xs outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
          />
        </label>

        <button
          type="submit"
          disabled={saving || !password || !confirmation}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:opacity-50 sm:w-auto"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
          Wijzigen
        </button>
      </form>

      {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

