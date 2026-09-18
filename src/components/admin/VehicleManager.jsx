"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ImagePlus, LogOut, Pencil, Plus, RefreshCw, Save, Trash2, X, MessageSquare } from "lucide-react";

const emptyForm = {
  brand: "", model: "", title: "", trim: "", year: "", firstRegistration: "", price: "", mileage: "",
  fuel: "", transmission: "", power: "", powerKw: "", body: "", vehicleType: "", drivetrain: "",
  seats: "", doors: "", batteryCapacity: "", range: "", engineCapacity: "", cylinders: "",
  emissionClass: "", co2Emission: "", energyLabel: "", color: "", paintType: "", interiorColor: "",
  upholstery: "", serviceHistory: "", nonSmoker: "", vatLabel: "", status: "concept", featured: false, newArrival: false,
  options: "", description: "",
};

const numberFields = new Set(["year", "price", "mileage", "power", "powerKw", "seats", "doors", "batteryCapacity", "range", "engineCapacity", "cylinders", "co2Emission"]);
const maximumImagesPerVehicle = 15;
const inputClass = "mt-1.5 h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-xs text-neutral-900 outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-100";

function Field({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) {
  return <label className="block text-[11px] font-bold text-neutral-700">{label}{required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}<input name={name} value={value} onChange={onChange} type={type} step={type === "number" ? "any" : undefined} min={type === "number" ? "0" : undefined} required={required} placeholder={placeholder} className={inputClass} /></label>;
}

function SelectField({ label, name, value, onChange, children, required = false }) {
  return <label className="block text-[11px] font-bold text-neutral-700">{label}<select name={name} value={value} onChange={onChange} required={required} className={inputClass}>{children}</select></label>;
}

function fromVehicle(vehicle) {
  return {
    brand: vehicle.brand || "", model: vehicle.model || "", title: vehicle.title || "", trim: vehicle.trim || "",
    year: vehicle.year ?? "", firstRegistration: vehicle.first_registration || "", price: vehicle.price ?? "",
    mileage: vehicle.mileage ?? "", fuel: vehicle.fuel || "", transmission: vehicle.transmission || "",
    power: vehicle.power ?? "", powerKw: vehicle.power_kw ?? "", body: vehicle.body || "",
    vehicleType: vehicle.vehicle_type || "", drivetrain: vehicle.drivetrain || "", seats: vehicle.seats ?? "",
    doors: vehicle.doors ?? "", batteryCapacity: vehicle.battery_capacity ?? "", range: vehicle.range_km ?? "",
    engineCapacity: vehicle.engine_capacity ?? "", cylinders: vehicle.cylinders ?? "", emissionClass: vehicle.emission_class || "",
    co2Emission: vehicle.co2_emission ?? "", energyLabel: vehicle.energy_label || "", color: vehicle.color || "",
    paintType: vehicle.paint_type || "", interiorColor: vehicle.interior_color || "", upholstery: vehicle.upholstery || "",
    serviceHistory: vehicle.service_history == null ? "" : String(vehicle.service_history),
    nonSmoker: vehicle.non_smoker == null ? "" : String(vehicle.non_smoker), vatLabel: vehicle.vat_label || "",
    status: vehicle.status || "concept", featured: Boolean(vehicle.featured), newArrival: Boolean(vehicle.new_arrival), options: (vehicle.options || []).join("\n"),
    description: vehicle.description || "",
  };
}

function toPayload(form) {
  const payload = {};
  for (const [key, value] of Object.entries(form)) {
    if (key === "options") payload.options = value.split(/\r?\n|,/).map((option) => option.trim()).filter(Boolean);
    else if (["featured", "newArrival"].includes(key)) payload[key] = Boolean(value);
    else if (["serviceHistory", "nonSmoker"].includes(key)) payload[key] = value === "" ? null : value === "true";
    else if (numberFields.has(key)) payload[key] = value === "" ? null : Number(value);
    else payload[key] = value === "" ? null : value;
  }
  return payload;
}

export default function VehicleManager() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function loadVehicles() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/vehicles", { cache: "no-store" });
      if (response.status === 401) {
        router.push("/beheer/login");
        return;
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Wagens ophalen mislukt.");
      setVehicles(result.vehicles || []);
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => loadVehicles(), 0);
    return () => window.clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredVehicles = useMemo(() => vehicles.filter((vehicle) => `${vehicle.brand} ${vehicle.model} ${vehicle.trim || ""}`.toLowerCase().includes(query.toLowerCase())), [vehicles, query]);

  function update(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function addFiles(fileList) {
    const incoming = Array.from(fileList || []);
    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
    const invalid = incoming.find((file) => !allowedTypes.has(file.type) || file.size > 10 * 1024 * 1024);
    if (invalid) {
      setError(`${invalid.name} is geen ondersteunde afbeelding of is groter dan 10 MB.`);
      return;
    }
    const existingCount = vehicles.find((vehicle) => vehicle.id === editingId)?.vehicle_images?.length || 0;
    setFiles((current) => {
      const known = new Set(current.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
      const uniqueIncoming = incoming.filter((file) => !known.has(`${file.name}-${file.size}-${file.lastModified}`));
      const remainingPlaces = Math.max(0, maximumImagesPerVehicle - existingCount - current.length);
      if (uniqueIncoming.length > remainingPlaces) {
        window.setTimeout(() => setError(`Een wagen kan maximaal ${maximumImagesPerVehicle} foto's hebben. U kunt nog ${remainingPlaces} foto${remainingPlaces === 1 ? "" : "'s"} toevoegen.`), 0);
      }
      return [...current, ...uniqueIncoming.slice(0, remainingPlaces)];
    });
    if (existingCount + files.length + incoming.length <= maximumImagesPerVehicle) setError("");
  }

  function moveFile(index, direction) {
    setFiles((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setFiles([]);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editVehicle(vehicle) {
    setEditingId(vehicle.id);
    setForm(fromVehicle(vehicle));
    setFiles([]);
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadSelectedImages(vehicleId, existingCount = 0) {
    for (let index = 0; index < files.length; index += 1) {
      const data = new FormData();
      data.append("file", files[index]);
      data.append("position", String(existingCount + index));
      data.append("altText", `${form.brand} ${form.model}`.trim());
      const response = await fetch(`/api/admin/vehicles/${vehicleId}/images`, { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) {
        const uploadError = new Error(result.error || `Upload van ${files[index].name} mislukt.`);
        uploadError.uploadedCount = index;
        throw uploadError;
      }
    }
  }

  async function submit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    if (!formElement.checkValidity()) {
      const invalidField = formElement.querySelector(":invalid");
      setError("Controleer de verplichte of ongeldige velden. Het eerste ongeldige veld is gemarkeerd.");
      invalidField?.scrollIntoView({ behavior: "smooth", block: "center" });
      invalidField?.focus({ preventScroll: true });
      formElement.reportValidity();
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");
    const wasEditing = Boolean(editingId);
    try {
      const response = await fetch(editingId ? `/api/admin/vehicles/${editingId}` : "/api/admin/vehicles", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(form)),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Opslaan mislukt.");
      const vehicleId = editingId || result.vehicle.id;

      if (!wasEditing) setEditingId(vehicleId);
      setNotice(wasEditing ? "Wagen is bijgewerkt." : "Wagen is toegevoegd.");
      await loadVehicles();

      const currentVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
      try {
        await uploadSelectedImages(vehicleId, currentVehicle?.vehicle_images?.length || 0);
      } catch (uploadError) {
        const uploadedCount = Number(uploadError.uploadedCount || 0);
        setFiles((current) => current.slice(uploadedCount));
        setError(`De wagen is wel opgeslagen, maar niet alle foto's zijn geüpload. ${uploadError.message} U kunt opnieuw op Wijzigingen opslaan klikken om de resterende foto's te proberen.`);
        await loadVehicles();
        return;
      }

      setNotice(editingId ? "Wagen en foto’s zijn bijgewerkt." : "Wagen en foto’s zijn toegevoegd.");
      setForm(emptyForm);
      setEditingId(null);
      setFiles([]);
      await loadVehicles();
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteVehicle(vehicle) {
    if (!window.confirm(`Wilt u ${vehicle.brand} ${vehicle.model} en alle foto’s definitief verwijderen?`)) return;
    setError("");
    const response = await fetch(`/api/admin/vehicles/${vehicle.id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = await response.json();
      return setError(result.error || "Verwijderen mislukt.");
    }
    setNotice("Wagen verwijderd.");
    if (editingId === vehicle.id) resetForm();
    await loadVehicles();
  }

  async function deleteImage(vehicleId, imageId) {
    if (!window.confirm("Deze foto definitief verwijderen?")) return;
    const response = await fetch(`/api/admin/vehicles/${vehicleId}/images/${imageId}`, { method: "DELETE" });
    if (!response.ok) {
      const result = await response.json();
      return setError(result.error || "Foto verwijderen mislukt.");
    }
    await loadVehicles();
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/beheer/login");
    router.refresh();
  }

  const editingVehicle = vehicles.find((vehicle) => vehicle.id === editingId);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">NEM Motors beheer</p><h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">Wagenaanbod beheren</h1></div>
        <div className="flex gap-2">
          <Link href="/beheer/aanvragen" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 px-4 text-xs font-bold hover:bg-neutral-50"><MessageSquare className="h-4 w-4" />Aanvragen</Link>
          <button type="button" onClick={loadVehicles} className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 px-4 text-xs font-bold hover:bg-neutral-50"><RefreshCw className="h-4 w-4" />Vernieuwen</button>
          <button type="button" onClick={logout} className="flex h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 text-xs font-bold text-white hover:bg-neutral-800"><LogOut className="h-4 w-4" />Uitloggen</button>
        </div>
      </div>

      {notice && <p role="status" className="mt-5 flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800"><Check className="h-4 w-4" />{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-md bg-red-50 px-4 py-3 text-xs font-bold text-red-700">{error}</p>}

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
        <form onSubmit={submit} noValidate className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4"><div><h2 className="text-xl font-black">{editingId ? "Wagen aanpassen" : "Nieuwe wagen"}</h2><p className="mt-1 text-xs text-neutral-500">Vul alleen bekende gegevens in. Merk en model zijn verplicht.</p></div>{editingId && <button type="button" onClick={resetForm} className="flex items-center gap-2 text-xs font-bold underline"><X className="h-4 w-4" />Annuleren</button>}</div>

          <fieldset className="mt-6"><legend className="text-sm font-black">Basisgegevens</legend><div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Merk" name="brand" value={form.brand} onChange={update} required /><Field label="Model" name="model" value={form.model} onChange={update} required /><Field label="Titel (optioneel)" name="title" value={form.title} onChange={update} /><Field label="Uitvoering" name="trim" value={form.trim} onChange={update} /><Field label="Bouwjaar" name="year" value={form.year} onChange={update} type="number" /><Field label="Eerste inschrijving" name="firstRegistration" value={form.firstRegistration} onChange={update} placeholder="Bijv. Maart 2023" /><Field label="Prijs (€)" name="price" value={form.price} onChange={update} type="number" required /><Field label="Kilometerstand" name="mileage" value={form.mileage} onChange={update} type="number" /></div></fieldset>

          <fieldset className="mt-7 border-t border-neutral-200 pt-6"><legend className="text-sm font-black">Techniek en voertuig</legend><div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><SelectField label="Brandstof" name="fuel" value={form.fuel} onChange={update}><option value="">Niet opgegeven</option>{["Benzine", "Diesel", "Hybride", "Elektrisch", "LPG"].map((value) => <option key={value}>{value}</option>)}</SelectField><SelectField label="Transmissie" name="transmission" value={form.transmission} onChange={update}><option value="">Niet opgegeven</option><option>Automaat</option><option>Handgeschakeld</option></SelectField><Field label="Carrosserie" name="body" value={form.body} onChange={update} /><Field label="Voertuigtype" name="vehicleType" value={form.vehicleType} onChange={update} /><Field label="Vermogen (pk)" name="power" value={form.power} onChange={update} type="number" /><Field label="Vermogen (kW)" name="powerKw" value={form.powerKw} onChange={update} type="number" /><Field label="Aandrijving" name="drivetrain" value={form.drivetrain} onChange={update} /><Field label="Cilinderinhoud (cm³)" name="engineCapacity" value={form.engineCapacity} onChange={update} type="number" /><Field label="Cilinders" name="cylinders" value={form.cylinders} onChange={update} type="number" /><Field label="Deuren" name="doors" value={form.doors} onChange={update} type="number" /><Field label="Zitplaatsen" name="seats" value={form.seats} onChange={update} type="number" /><Field label="Emissieklasse" name="emissionClass" value={form.emissionClass} onChange={update} /></div></fieldset>

          <fieldset className="mt-7 border-t border-neutral-200 pt-6"><legend className="text-sm font-black">Elektrisch, kleur en interieur</legend><div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Accucapaciteit (kWh)" name="batteryCapacity" value={form.batteryCapacity} onChange={update} type="number" /><Field label="Actieradius (km)" name="range" value={form.range} onChange={update} type="number" /><Field label="CO₂-uitstoot" name="co2Emission" value={form.co2Emission} onChange={update} type="number" /><Field label="Energielabel" name="energyLabel" value={form.energyLabel} onChange={update} /><Field label="Kleur" name="color" value={form.color} onChange={update} /><Field label="Laktype" name="paintType" value={form.paintType} onChange={update} /><Field label="Interieurkleur" name="interiorColor" value={form.interiorColor} onChange={update} /><Field label="Bekleding" name="upholstery" value={form.upholstery} onChange={update} /></div></fieldset>

          <fieldset className="mt-7 border-t border-neutral-200 pt-6"><legend className="text-sm font-black">Historiek en publicatie</legend><div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><SelectField label="Onderhoudshistoriek" name="serviceHistory" value={form.serviceHistory} onChange={update}><option value="">Niet opgegeven</option><option value="true">Ja</option><option value="false">Nee</option></SelectField><SelectField label="Niet-rokersauto" name="nonSmoker" value={form.nonSmoker} onChange={update}><option value="">Niet opgegeven</option><option value="true">Ja</option><option value="false">Nee</option></SelectField><Field label="Btw-vermelding" name="vatLabel" value={form.vatLabel} onChange={update} /><SelectField label="Status" name="status" value={form.status} onChange={update} required><option value="concept">Concept</option><option value="beschikbaar">Beschikbaar</option><option value="gereserveerd">Gereserveerd</option><option value="verkocht">Verkocht</option></SelectField></div><div className="mt-4 flex flex-wrap gap-6"><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" name="featured" checked={form.featured} onChange={update} className="h-4 w-4 accent-neutral-950" />Uitgelichte wagen</label><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" name="newArrival" checked={form.newArrival} onChange={update} className="h-4 w-4 accent-neutral-950" />Label “Nieuw binnen” tonen</label></div></fieldset>

          <div className="mt-7 grid gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-2"><label className="block text-[11px] font-bold text-neutral-700">Uitrusting <span className="font-normal text-neutral-400">(één optie per regel)</span><textarea name="options" value={form.options} onChange={update} rows="7" className={`${inputClass} h-auto py-3`} /></label><label className="block text-[11px] font-bold text-neutral-700">Beschrijving<textarea name="description" value={form.description} onChange={update} rows="7" className={`${inputClass} h-auto py-3`} /></label></div>

          <div className="mt-7 border-t border-neutral-200 pt-6"><h3 className="text-sm font-black">Foto’s</h3><label onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }} className="mt-3 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-5 text-center hover:border-neutral-500"><ImagePlus className="h-6 w-6" /><span className="mt-2 text-xs font-bold">Sleep foto’s hierheen of klik om ze te selecteren</span><span className="mt-1 text-[10px] text-neutral-500">Maximaal 15 foto’s per wagen en 10 MB per foto. JPEG, PNG, WebP of AVIF worden automatisch verkleind en als WebP opgeslagen.</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }} className="sr-only" /></label>
            {files.length > 0 && <div className="mt-4"><div className="flex items-center justify-between"><p className="text-xs font-bold">{files.length} nieuwe {files.length === 1 ? "foto" : "foto’s"}</p><button type="button" onClick={() => setFiles([])} className="text-[10px] font-bold text-red-600 underline">Selectie wissen</button></div><div className="mt-2 space-y-2">{files.map((file, index) => <div key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center gap-3 rounded-md border border-neutral-200 bg-white px-3 py-2"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-neutral-100 text-[10px] font-black">{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">{file.name}</p><p className="text-[9px] text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB{index === 0 ? " · hoofdfoto" : ""}</p></div><button type="button" disabled={index === 0} onClick={() => moveFile(index, -1)} className="h-7 px-2 text-[10px] font-bold disabled:opacity-25" aria-label={`${file.name} naar voren`}>←</button><button type="button" disabled={index === files.length - 1} onClick={() => moveFile(index, 1)} className="h-7 px-2 text-[10px] font-bold disabled:opacity-25" aria-label={`${file.name} naar achteren`}>→</button><button type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="flex h-7 w-7 items-center justify-center rounded text-red-600 hover:bg-red-50" aria-label={`${file.name} verwijderen`}><X className="h-4 w-4" /></button></div>)}</div></div>}
            {editingVehicle?.vehicle_images?.length > 0 && <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{[...editingVehicle.vehicle_images].sort((a, b) => a.position - b.position).map((image) => <div key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-md bg-neutral-100"><Image src={image.public_url} alt={image.alt_text || "Voertuigfoto"} fill sizes="180px" className="object-cover" /><button type="button" onClick={() => deleteImage(editingVehicle.id, image.id)} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-600 shadow"><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div>}
          </div>

          <button type="submit" disabled={saving} className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-md bg-neutral-950 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:opacity-60">{saving ? "Bezig met opslaan en uploaden…" : editingId ? "Wijzigingen opslaan" : "Wagen toevoegen"}<Save className="h-4 w-4" /></button>
        </form>

        <aside className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm xl:sticky xl:top-24">
          <div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-black">Alle wagens</h2><p className="text-xs text-neutral-500">{vehicles.length} totaal</p></div><button type="button" onClick={resetForm} className="flex h-9 items-center gap-2 rounded-md bg-neutral-950 px-3 text-[11px] font-bold text-white"><Plus className="h-4 w-4" />Nieuwe wagen</button></div>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek op merk of model" className={`${inputClass} mt-4`} />
          <div className="mt-4 max-h-[70vh] space-y-3 overflow-y-auto pr-1">{loading ? <p className="py-10 text-center text-xs text-neutral-500">Wagens laden…</p> : filteredVehicles.length === 0 ? <p className="py-10 text-center text-xs text-neutral-500">Geen wagens gevonden.</p> : filteredVehicles.map((vehicle) => <article key={vehicle.id} className={`rounded-lg border p-3 ${editingId === vehicle.id ? "border-neutral-950 bg-neutral-50" : "border-neutral-200"}`}><div className="flex gap-3">{vehicle.vehicle_images?.[0] ? <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-neutral-100"><Image src={[...vehicle.vehicle_images].sort((a, b) => a.position - b.position)[0].public_url} alt="" fill sizes="96px" className="object-cover" /></div> : <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded bg-neutral-100 text-[9px] text-neutral-400">Geen foto</div>}<div className="min-w-0 flex-1"><h3 className="truncate text-sm font-black">{vehicle.brand} {vehicle.model}</h3><p className="mt-1 truncate text-[10px] text-neutral-500">{vehicle.trim || "Geen uitvoering"}</p><span className={`mt-2 inline-block rounded-full px-2 py-1 text-[9px] font-bold ${vehicle.status === "beschikbaar" ? "bg-emerald-100 text-emerald-800" : vehicle.status === "gereserveerd" ? "bg-amber-100 text-amber-800" : vehicle.status === "verkocht" ? "bg-neutral-200 text-neutral-700" : "bg-blue-100 text-blue-800"}`}>{vehicle.status}</span></div></div><div className="mt-3 flex gap-2"><button type="button" onClick={() => editVehicle(vehicle)} className="flex h-8 flex-1 items-center justify-center gap-2 rounded border border-neutral-300 text-[10px] font-bold"><Pencil className="h-3.5 w-3.5" />Bewerken</button><button type="button" onClick={() => deleteVehicle(vehicle)} className="flex h-8 items-center justify-center rounded border border-red-200 px-3 text-red-600"><Trash2 className="h-3.5 w-3.5" /></button></div></article>)}</div>
        </aside>
      </div>
    </div>
  );
}
