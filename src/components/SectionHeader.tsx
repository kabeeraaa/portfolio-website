// src/components/SectionHeader.tsx

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mb-5">
      <div className="text-xs uppercase tracking-[0.35em] text-cyan-200">
        {eyebrow}
      </div>
      <div className="mt-2 text-2xl font-black italic md:text-3xl">
        {title}
      </div>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
      )}
    </div>
  );
}