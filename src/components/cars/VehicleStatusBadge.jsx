const labels = {
  gereserveerd: "Gereserveerd",
  verkocht: "Verkocht",
};

const styles = {
  gereserveerd: "bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-300",
  verkocht: "bg-neutral-950 text-white ring-1 ring-inset ring-white/10",
};

export default function VehicleStatusBadge({ status, compact = false }) {
  const normalizedStatus = String(status || "").toLowerCase();
  if (!labels[normalizedStatus]) return null;
  return (
    <span className={`inline-flex w-fit items-center rounded-full font-bold uppercase tracking-[0.08em] ${compact ? "px-2.5 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]"} ${styles[normalizedStatus]}`}>
      {labels[normalizedStatus]}
    </span>
  );
}
