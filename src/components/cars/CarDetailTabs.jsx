"use client";

import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overzicht" },
  { id: "specifications", label: "Specificaties" },
  { id: "equipment", label: "Uitrusting" },
  { id: "description", label: "Beschrijving" },
];

export default function CarDetailTabs({ overview = [], specifications = [], options = [], description = "" }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section>
      <div role="tablist" aria-label="Voertuiginformatie" className="flex gap-8 overflow-x-auto border-b border-neutral-200 text-xs text-neutral-500">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 border-b-2 px-2 pb-3 transition-colors ${activeTab === tab.id ? "border-neutral-950 font-bold text-neutral-950" : "border-transparent hover:text-neutral-950"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-5">
        {activeTab === "overview" && (
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview">
            <h2 className="text-xl font-black tracking-tight">Alles over deze wagen</h2>
            <DataGrid rows={overview} />
          </div>
        )}

        {activeTab === "specifications" && (
          <div role="tabpanel" id="panel-specifications" aria-labelledby="tab-specifications">
            <h2 className="text-xl font-black tracking-tight">Specificaties</h2>
            {specifications.length ? <DataGrid rows={specifications} /> : <EmptyState text="Voor deze wagen zijn nog geen aanvullende specificaties beschikbaar." />}
          </div>
        )}

        {activeTab === "equipment" && (
          <div role="tabpanel" id="panel-equipment" aria-labelledby="tab-equipment">
            <h2 className="text-xl font-black tracking-tight">Uitrusting</h2>
            {options.length ? (
              <ul className="mt-3 grid gap-x-10 gap-y-3 rounded-lg border border-neutral-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
                {options.map((option, index) => (
                  <li key={`${option}-${index}`} className="flex items-center gap-3 text-sm text-neutral-700">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950" aria-hidden="true" />
                    {option}
                  </li>
                ))}
              </ul>
            ) : <EmptyState text="Voor deze wagen is nog geen uitrustingslijst beschikbaar." />}
          </div>
        )}

        {activeTab === "description" && (
          <div role="tabpanel" id="panel-description" aria-labelledby="tab-description">
            <h2 className="text-xl font-black tracking-tight">Beschrijving</h2>
            {description ? (
              <p className="mt-3 whitespace-pre-line rounded-lg border border-neutral-200 bg-white p-6 text-sm leading-7 text-neutral-600">{description}</p>
            ) : <EmptyState text="Voor deze wagen is nog geen beschrijving beschikbaar." />}
          </div>
        )}
      </div>
    </section>
  );
}

function DataGrid({ rows }) {
  return (
    <dl className="mt-3 grid overflow-hidden rounded-lg border border-neutral-200 bg-white sm:grid-cols-2 lg:grid-cols-3">
      {rows.map(([label, value]) => (
        <div key={label} className="border-b border-neutral-200 px-7 py-4 lg:[&:not(:nth-child(3n+1))]:border-l">
          <dt className="text-[10px] text-neutral-500">{label}</dt>
          <dd className="mt-1 text-sm font-bold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function EmptyState({ text }) {
  return <p className="mt-3 rounded-lg border border-neutral-200 bg-white p-6 text-sm text-neutral-500">{text}</p>;
}
