import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-neutral-500">
      <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
      <p className="text-sm font-semibold tracking-tight">Laden...</p>
    </div>
  );
}

