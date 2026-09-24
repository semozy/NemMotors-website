const labels = {
  gereserveerd: "Gereserveerd",
  verkocht: "Verkocht",
};

const styles = {
  gereserveerd: "bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-300",
  verkocht: "bg-red-600 text-white ring-2 ring-white shadow-[0_0_15px_rgba(220,38,38,0.6)] font-black tracking-widest",
};

export default function VehicleStatusBadge({ status, compact = false }) {
  const normalizedStatus = String(status || "").toLowerCase();
  if (!labels[normalizedStatus]) return null;
  
  const isVerkocht = normalizedStatus === "verkocht";
  const sizeClasses = isVerkocht 
    ? (compact ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-sm")
    : (compact ? "px-2.5 py-1 text-[9px] font-bold tracking-[0.08em]" : "px-3 py-1.5 text-[10px] font-bold tracking-[0.08em]");

  return (
    <span className={`inline-flex w-fit items-center rounded-full uppercase ${sizeClasses} ${styles[normalizedStatus]}`}>
      {labels[normalizedStatus]}
    </span>
  );
}
