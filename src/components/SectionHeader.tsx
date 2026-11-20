type SectionHeaderProps = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  onLightBackground?: boolean;
};

export default function SectionHeader({ id, eyebrow, title, subtitle, onLightBackground }: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <div className={`text-xs font-semibold uppercase tracking-[0.22em] ${onLightBackground ? "text-[#031325]" : "text-cyan-200"}`}>{eyebrow}</div>
      <h2 id={id} className="mt-1.5 text-2xl leading-tight font-black italic md:text-3xl">{title}</h2>
      {subtitle && <p className={`mt-2 max-w-[65ch] text-sm leading-relaxed ${onLightBackground ? "text-[#031325]" : "text-slate-300"}`}>{subtitle}</p>}
    </div>
  );
}
