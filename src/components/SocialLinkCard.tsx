// src/components/SocialLinkCard.tsx

import { motion } from "framer-motion";

type Props = {
  label: string;
  value: string;
  href: string | null;
};

export default function SocialLinkCard({ label, value, href }: Props) {
  const base =
    "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:bg-cyan-400/10";

  if (!href) {
    return (
      <motion.div className={`${base} opacity-70`}>
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-xs text-slate-300">{value}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={base}
    >
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-slate-300">{value}</div>
      </div>
    </motion.a>
  );
}