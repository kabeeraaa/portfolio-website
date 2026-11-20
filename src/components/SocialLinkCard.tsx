import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type LinkedInMark from "./LinkedInMark";

type SocialLinkItem = {
  icon: LucideIcon | typeof LinkedInMark;
  label: string;
  href: string;
  value: string;
  external: boolean;
};

type SocialLinkCardProps = {
  item: SocialLinkItem;
  delay?: number;
};

export default function SocialLinkCard({ item, delay = 0 }: SocialLinkCardProps) {
  const Icon = item.icon;
  const commonClassName =
    "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-cyan-400/10";

  const content = (
    <>
      <div className="min-w-0 flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0 text-cyan-300" />
        <div className="min-w-0">
          <div className="font-semibold tracking-wide">{item.label}</div>
          <div className="truncate text-xs text-slate-300">{item.value}</div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-cyan-200/70" />
    </>
  );

  return (
    <motion.a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={commonClassName}
    >
      {content}
    </motion.a>
  );
}
