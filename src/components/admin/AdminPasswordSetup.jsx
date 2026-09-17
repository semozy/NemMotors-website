"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function AdminPasswordSetup() {
  const router = useRouter();
  const [supabase] = useState(() => createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: false } },
  ));
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setReady(Boolean(data.session));
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setReady(Boolean(session));
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (password.length < 12) return setError("Gebruik minimaal twaalf tekens.");
    if (password !== confirmation) return setError("De wachtwoorden zijn niet gelijk.");
    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }
    await supabase.auth.signOut();
    router.replace("/beheer/login");
    router.refresh();
  }

  if (!ready) return <p role="status" className="mt-7 rounded-md bg-amber-50 px-4 py-3 text-xs text-amber-800">Open deze pagina via de nieuwste beveiligde link in uw e-mail. De link kan verlopen zijn.</p>;

  return (
    <form onSubmit={submit} className="mt-7 space-y-4">
      <label className="block text-xs font-bold text-neutral-700">Nieuw wachtwoord<input type="password" minLength="12" required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-100" /></label>
      <label className="block text-xs font-bold text-neutral-700">Herhaal wachtwoord<input type="password" minLength="12" required autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-100" /></label>
      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
      <button type="submit" disabled={saving} className="h-11 w-full rounded-md bg-neutral-950 text-xs font-bold text-white disabled:opacity-60">{saving ? "Opslaan…" : "Wachtwoord opslaan"}</button>
    </form>
  );
}
