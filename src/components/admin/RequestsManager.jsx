"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Clock, Trash2, LogOut, ArrowLeft, RefreshCw, Car, Users } from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "contact", label: "Contactaanvragen" },
  { id: "test_drive", label: "Proefritten" },
  { id: "sell", label: "Verkoopaanvragen" },
];

export default function RequestsManager() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("contact");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadRequests() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/requests/${activeTab}`, { cache: "no-store" });
      if (response.status === 401) {
        router.push("/beheer/login");
        return;
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Laden mislukt.");
      setRequests(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadRequests();
  }, [activeTab, router]);

  async function updateStatus(id, newStatus) {
    try {
      const response = await fetch(`/api/admin/requests/${activeTab}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Status updaten mislukt.");
      setRequests((current) =>
        current.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
      setNotice("Status bijgewerkt.");
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteRequest(id) {
    if (!window.confirm("Aanvraag definitief verwijderen?")) return;
    try {
      const response = await fetch(`/api/admin/requests/${activeTab}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Verwijderen mislukt.");
      setRequests((current) => current.filter((req) => req.id !== id));
      setNotice("Aanvraag verwijderd.");
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/beheer/login");
    router.refresh();
  }

  function renderRequestCard(req) {
    return (
      <article key={req.id} className={`rounded-xl border bg-white p-5 shadow-sm transition ${req.status === "nieuw" ? "border-blue-200 ring-1 ring-blue-100" : "border-neutral-200 opacity-70"}`}>
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${req.status === "nieuw" ? "bg-blue-100 text-blue-700" : req.status === "bevestigd" ? "bg-emerald-100 text-emerald-700" : req.status === "geannuleerd" ? "bg-red-100 text-red-700" : "bg-neutral-100 text-neutral-600"}`}>
                {req.status === "nieuw" ? <Clock className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                {req.status}
              </span>
              <span className="text-[10px] text-neutral-400">{new Date(req.created_at).toLocaleString("nl-BE")}</span>
            </div>
            <h3 className="mt-2 text-lg font-black">{req.name}</h3>
            <p className="mt-1 text-xs font-medium text-neutral-600"><a href={`mailto:${req.email}`} className="hover:underline">{req.email}</a> {req.phone && <span>• <a href={`tel:${req.phone}`} className="hover:underline">{req.phone}</a></span>}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {activeTab === "test_drive" ? (
              <>
                {req.status === "nieuw" && (
                  <>
                    <button onClick={() => updateStatus(req.id, "bevestigd")} className="flex h-8 items-center gap-2 rounded bg-neutral-950 px-3 text-[10px] font-bold text-white hover:bg-neutral-800">Bevestigen</button>
                    <button onClick={() => updateStatus(req.id, "geannuleerd")} className="flex h-8 items-center gap-2 rounded border border-neutral-300 px-3 text-[10px] font-bold hover:bg-neutral-50">Annuleren</button>
                  </>
                )}
                {req.status !== "nieuw" && (
                  <button onClick={() => updateStatus(req.id, "nieuw")} className="flex h-8 items-center gap-2 rounded border border-neutral-300 px-3 text-[10px] font-bold hover:bg-neutral-50">Zet terug op nieuw</button>
                )}
              </>
            ) : (
              <>
                {req.status === "nieuw" ? (
                  <button onClick={() => updateStatus(req.id, "afgehandeld")} className="flex h-8 items-center gap-2 rounded bg-neutral-950 px-3 text-[10px] font-bold text-white hover:bg-neutral-800"><Check className="h-3.5 w-3.5" /> Markeer afgehandeld</button>
                ) : (
                  <button onClick={() => updateStatus(req.id, "nieuw")} className="flex h-8 items-center gap-2 rounded border border-neutral-300 px-3 text-[10px] font-bold hover:bg-neutral-50">Zet terug op nieuw</button>
                )}
              </>
            )}
            <button onClick={() => deleteRequest(req.id)} className="flex h-8 w-8 items-center justify-center rounded border border-red-200 text-red-600 hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-4 text-sm">
          {activeTab === "test_drive" && (
            <div className="mb-4 rounded-md bg-neutral-50 p-3 text-xs">
              <p className="font-bold text-neutral-900">Voorkeursmoment: <span className="font-normal">{req.date} om {req.time}</span></p>
              <p className="mt-1 font-bold text-neutral-900">Wagen: <span className="font-normal">{req.vehicles?.brand} {req.vehicles?.model} {req.vehicles?.trim}</span></p>
            </div>
          )}

          {activeTab === "sell" && (
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-md bg-neutral-50 p-3 text-xs sm:grid-cols-4">
              <div><p className="text-neutral-500">Merk/Model</p><p className="font-bold">{req.brand} {req.model}</p></div>
              <div><p className="text-neutral-500">Bouwjaar</p><p className="font-bold">{req.year}</p></div>
              <div><p className="text-neutral-500">Kilometerstand</p><p className="font-bold">{req.mileage != null ? Number(req.mileage).toLocaleString("nl-BE") : "0"} km</p></div>
              <div><p className="text-neutral-500">Gewenste prijs</p><p className="font-bold">{req.price ? `€ ${Number(req.price).toLocaleString("nl-BE")}` : "Niet opgegeven"}</p></div>
            </div>
          )}

          {req.message && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Bericht / Opmerking</p>
              <p className="mt-1 whitespace-pre-wrap text-neutral-700">{req.message}</p>
            </div>
          )}

          {activeTab === "sell" && req.sell_request_images?.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Foto&apos;s ({req.sell_request_images.length})</p>
              <div className="flex flex-wrap gap-3">
                {req.sell_request_images.map(img => (
                  <a key={img.id} href={img.public_url} target="_blank" rel="noreferrer" className="relative h-20 w-24 overflow-hidden rounded border border-neutral-200 transition hover:opacity-80">
                    <Image src={img.public_url} alt="Inruil wagen" fill sizes="96px" className="object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-7 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">NEM Motors beheer</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">Aanvragen beheren</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/beheer" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 px-4 text-xs font-bold hover:bg-neutral-50">Dashboard</Link>
          <Link href="/beheer/wagens" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 px-4 text-xs font-bold hover:bg-neutral-50"><Car className="h-4 w-4" />Wagens</Link>
          <Link href="/beheer/accounts" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 px-4 text-xs font-bold hover:bg-neutral-50"><Users className="h-4 w-4" />Accounts</Link>
          <button type="button" onClick={() => loadRequests()} className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 px-4 text-xs font-bold hover:bg-neutral-50"><RefreshCw className="h-4 w-4" />Vernieuwen</button>
          <button type="button" onClick={logout} className="flex h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 text-xs font-bold text-white"><LogOut className="h-4 w-4" />Uitloggen</button>
        </div>
      </div>

      <div className="mt-8 flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs font-bold transition-colors ${activeTab === tab.id ? "border-b-2 border-neutral-950 text-neutral-950" : "border-b-2 border-transparent text-neutral-500 hover:text-neutral-900"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {notice && <p role="status" className="mt-5 flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800"><Check className="h-4 w-4" />{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-md bg-red-50 px-4 py-3 text-xs font-bold text-red-700">{error}</p>}

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="py-10 text-center text-sm text-neutral-500">Aanvragen laden...</p>
        ) : requests.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <Check className="mx-auto h-8 w-8 text-neutral-400" />
            <p className="mt-3 text-sm font-bold text-neutral-900">Geen aanvragen gevonden</p>
            <p className="mt-1 text-xs text-neutral-500">Alles is netjes afgehandeld of er zijn nog geen nieuwe aanvragen binnengekomen.</p>
          </div>
        ) : (
          requests.map(renderRequestCard)
        )}
      </div>
    </div>
  );
}

