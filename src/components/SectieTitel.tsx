interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function SectieTitel({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-red-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-8 text-neutral-400">{subtitle}</p>
      )}
    </div>
  );
}
