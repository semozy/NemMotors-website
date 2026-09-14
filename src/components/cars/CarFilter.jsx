import { Car, ChevronDown, Euro, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
const velden = [
    { label: "Zoek merk", icon: Car },
    { label: "Zoek model", icon: Car },
    { label: "Prijs tot", icon: Euro },
    { label: "Type", icon: Car },
];
export default function CarFilter() {
    return (<Container className="-mt-14 py-0">
      <div className="relative z-20 rounded-sm border border-[#ffc20e] bg-black/90 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur md:p-4">
        <h2 className="sr-only">Vind de auto die bij je past</h2>
        <fieldset disabled aria-describedby="zoeken-status" className="grid gap-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          {velden.map(({ label, icon: Icon }) => (<label key={label} className="relative block">
              <span className="sr-only">{label}</span>
              <Icon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"/>
              <Input placeholder={label} className="h-12 w-full cursor-not-allowed rounded-sm border border-white/15 bg-neutral-950 pl-12 pr-10 text-xs font-semibold text-white placeholder:text-neutral-500"/>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"/>
            </label>))}
          <Button type="button" className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-sm bg-[#ffc20e] px-7 text-xs font-black text-neutral-950">
            <Search aria-hidden="true" className="h-4 w-4"/> Zoeken
          </Button>
        </fieldset>
        <p id="zoeken-status" className="mt-3 text-xs text-neutral-400">Zoeken is nog niet beschikbaar.</p>
      </div>
    </Container>);
}


export function InventoryFilters({ cars, filters, onChange, onReset, priceLimit }) {
  const brands = [...new Set(cars.map((car) => car.brand))].sort();
  const models = [...new Set(cars.filter((car) => !filters.brand || car.brand === filters.brand).map((car) => car.model))].sort();
  const selectClass = "mt-2 h-10 w-full rounded border border-neutral-200 bg-white px-2 text-xs font-normal text-neutral-600 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20";
  const field = (name, label, options, placeholder) => (
    <label className="block text-xs font-bold text-neutral-800">{label}
      <select value={filters[name]} onChange={(event) => onChange(name, event.target.value)} className={selectClass}>
        <option value="">{placeholder}</option>
        {options.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
    </label>
  );
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-2"><h2 className="text-sm font-black text-neutral-950">Filters</h2><button type="button" onClick={onReset} className="text-[11px] font-semibold text-neutral-500 underline-offset-4 hover:text-neutral-950 hover:underline">Filters wissen</button></div>
      <div className="space-y-5">
        {field("brand", "Merk", brands, "Alle merken")}
        {field("model", "Model", models, "Alle modellen")}
        <label className="block text-xs font-bold text-neutral-800">Prijs tot
          <input type="range" min="0" max={priceLimit} step="500" value={filters.price || priceLimit} onChange={(event) => onChange("price", event.target.value)} className="mt-4 block w-full accent-[#dca600]" />
          <span className="mt-2 flex justify-between text-[10px] font-normal text-neutral-500"><span>? 0</span><span>? {Number(filters.price || priceLimit).toLocaleString("nl-BE")}</span></span>
        </label>
        <fieldset><legend className="text-xs font-bold text-neutral-800">Bouwjaar</legend><div className="mt-2 grid grid-cols-2 gap-2">
          {field("yearFrom", "Van", [...new Set(cars.map((car) => car.year).filter(Boolean))].sort((a, b) => b - a), "Alle jaren")}
          {field("yearTo", "Tot", [...new Set(cars.map((car) => car.year).filter(Boolean))].sort((a, b) => b - a), "Alle jaren")}
        </div></fieldset>
        <fieldset><legend className="text-xs font-bold text-neutral-800">Kilometerstand</legend><div className="mt-2 grid grid-cols-2 gap-2">
          {field("kmFrom", "Van", [0, 25000, 50000, 75000, 100000, 150000, 200000], "Alle km")}
          {field("kmTo", "Tot", [25000, 50000, 75000, 100000, 150000, 200000, 300000], "Alle km")}
        </div></fieldset>
        {[["fuel", "Brandstof", ["Benzine", "Diesel", "Hybride", "Elektrisch"]], ["transmission", "Transmissie", [...new Set(cars.map((car) => car.transmission).filter(Boolean))]]].map(([name, label, values]) => (
          <fieldset key={name}><legend className="mb-3 text-xs font-bold text-neutral-800">{label}</legend><div className="space-y-2.5">
            {values.map((value) => <label key={value} className="flex items-center gap-2 text-xs text-neutral-600"><input type="checkbox" checked={filters[name].includes(value)} onChange={() => onChange(name, filters[name].includes(value) ? filters[name].filter((item) => item !== value) : [...filters[name], value])} className="h-3.5 w-3.5 accent-[#dca600]" />{value}<span className="ml-auto text-[10px] text-neutral-400">{cars.filter((car) => car[name] === value).length}</span></label>)}
          </div></fieldset>
        ))}
      </div>
    </div>
  );
}
