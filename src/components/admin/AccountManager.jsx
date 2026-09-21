"use client";

import { useState, useEffect } from "react";
import { Plus, UserX, UserCheck, Loader2, Trash2 } from "lucide-react";

export default function AccountManager({ currentUserEmail }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [tempPwd, setTempPwd] = useState("");

  async function fetchAccounts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/accounts");
      const data = await res.json();
      if (data.accounts) setAccounts(data.accounts);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function handleInvite(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setTempPwd("");
    setInviting(true);

    try {
      const res = await fetch("/api/admin/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmail("");
        setSuccessMsg("Account succesvol aangemaakt!");
        if (data.tempPassword) setTempPwd(data.tempPassword);
        await fetchAccounts();
      } else {
        setError(data.error || "Fout bij uitnodigen.");
      }
    } catch {
      setError("Er is een onverwachte fout opgetreden.");
    }
    setInviting(false);
  }

  async function toggleStatus(id, currentStatus) {
    try {
      const res = await fetch(`/api/admin/accounts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentStatus }),
      });
      if (res.ok) {
        await fetchAccounts();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteAccount(id) {
    if (!window.confirm("Weet je zeker dat je dit account definitief wilt verwijderen?")) return;
    try {
      const res = await fetch(`/api/admin/accounts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAccounts();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-8">
      {/* Invite Form */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-black tracking-tight text-neutral-900">Nieuwe beheerder toevoegen</h2>
        <p className="mt-1 text-xs text-neutral-500">
          Maak een account aan voor een collega. Er wordt direct een inlogwachtwoord gegenereerd.
        </p>
        
        <form onSubmit={handleInvite} className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mailadres collega"
            className="h-10 w-full max-w-xs rounded-md border border-neutral-200 px-3 text-xs outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
          />
          <button
            type="submit"
            disabled={inviting || !email}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:opacity-50 sm:w-auto"
          >
            {inviting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Toevoegen
          </button>
        </form>
        {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
        {successMsg && (
          <div className="mt-4 rounded-md bg-emerald-50 p-4 border border-emerald-100">
            <p className="text-xs font-bold text-emerald-800">{successMsg}</p>
            {tempPwd && (
              <div className="mt-2">
                <p className="text-[11px] text-emerald-700 mb-1">Geef dit tijdelijke wachtwoord aan je collega zodat ze kunnen inloggen:</p>
                <code className="block select-all rounded bg-emerald-100/50 px-2 py-1.5 text-xs font-bold text-emerald-900 font-mono">
                  {tempPwd}
                </code>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Account List */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-sm font-black tracking-tight text-neutral-900">Beheerdersaccounts</h2>
        </div>
        
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
          </div>
        ) : accounts.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-neutral-500">Geen accounts gevonden.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-6 py-3 font-medium">E-mailadres</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {accounts.map((acc) => (
                  <tr key={acc.id} className="transition hover:bg-neutral-50/50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-900">
                      {acc.email}
                      {acc.email === currentUserEmail && <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">Jij</span>}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {acc.active ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Actief
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-bold text-neutral-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" /> Inactief
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      {acc.email !== currentUserEmail && (
                        <div className="flex items-center justify-end gap-4">
                          <button
                            onClick={() => toggleStatus(acc.id, acc.active)}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold transition hover:opacity-70 ${acc.active ? "text-red-600" : "text-emerald-600"}`}
                          >
                            {acc.active ? <><UserX className="h-3.5 w-3.5" /> Deactiveren</> : <><UserCheck className="h-3.5 w-3.5" /> Activeren</>}
                          </button>
                          <button
                            onClick={() => deleteAccount(acc.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 transition hover:text-red-600"
                            title="Account verwijderen"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

