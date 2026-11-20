import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, ChevronRight, Code2, GitFork, Shield, UserCircle2 } from "lucide-react";
import { contact, profile } from "./data/profile";
import type { SectionId } from "./data/portfolioData";
import LinkedInMark from "./LinkedInMark";
import SectionHeader from "./SectionHeader";
import SocialLinkCard from "./SocialLinkCard";

const socialLinks = [
  { icon: LinkedInMark, label: "LinkedIn", href: contact.linkedin.href, value: contact.linkedin.label, external: true },
  { icon: GitFork, label: "GitHub", href: contact.github.href, value: contact.github.label, external: true },
];

const statCards = [
  ["Class", profile.discipline],
  ["Base", contact.location],
  ["Role", profile.roleLabel],
  ["Status", profile.status],
];

const highlightIcons = { security: Shield, development: Code2, roles: Briefcase };

export default function ProfileHero({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const reduceMotion = useReducedMotion();
  const [firstName, ...lastName] = profile.name.toUpperCase().split(" ");

  return (
    <section id="about" aria-labelledby="about-heading" tabIndex={-1} className="grid items-stretch gap-5 md:gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative min-w-0 overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#10263d]/95 p-5 shadow-2xl sm:p-6 lg:p-8"
      >
        <motion.div
          animate={{ opacity: reduceMotion ? 0.35 : [0.35, 0.6, 0.35] }}
          transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
          className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
        />

        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200 sm:text-sm">Player Profile</div>
        <h1 id="about-heading" className="text-[clamp(2.5rem,10vw,3rem)] leading-none font-black italic tracking-tight md:text-6xl 2xl:text-7xl">
          {firstName}
          <br />
          {lastName.join(" ")}
        </h1>
        <div className="mt-4 inline-flex items-start gap-2 rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-sm leading-snug font-semibold text-cyan-100 sm:items-center">
          <Shield aria-hidden="true" className="mt-0.5 size-4 shrink-0 sm:mt-0" />
          {profile.title}
        </div>

        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-slate-100 md:text-lg">{profile.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onNavigate("projects")}
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-[#53b2ff] px-3 py-2 text-sm font-bold text-[#02101d] shadow-lg transition-colors hover:bg-[#80c7ff] sm:px-5"
          >
            View Projects <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10 sm:px-5"
          >
            Contact Me
          </button>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-4 2xl:grid-cols-4">
          {statCards.map(([label, value], idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 + idx * 0.08 }}
              className="min-w-0 rounded-2xl border border-white/10 bg-[#091c34]/80 p-3 sm:p-4"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">{label}</div>
              <div className="mt-1.5 text-sm leading-snug font-semibold wrap-anywhere md:text-base">{value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="grid min-w-0 gap-5 md:gap-6"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#0a1f3a]/90 p-5 shadow-2xl sm:p-6">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />
          <SectionHeader eyebrow="Direct Links" title="SOCIAL / CONTACT" />
          <div className="space-y-3">
            {socialLinks.map((item, idx) => (
              <SocialLinkCard key={item.label} item={item} delay={0.35 + idx * 0.08} />
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-cyan-300/20 bg-white/5 p-5 shadow-2xl sm:p-6">
          <SectionHeader eyebrow="Profile Visual" title="AVATAR PANEL" />
          <div className="relative mb-6 overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-[linear-gradient(135deg,#0b2241,#07172a)] p-4 sm:p-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />
            <motion.div
              animate={reduceMotion ? { opacity: 0.2, scale: 1 } : { opacity: [0.2, 0.45, 0.2], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl"
            />
            <div className="relative flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 sm:size-16">
                <UserCircle2 className="size-8 text-cyan-200 sm:size-10" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">Operator</div>
                <div className="text-xl leading-snug font-black italic sm:text-2xl">{profile.name}</div>
                <div className="mt-1 text-sm text-slate-300">
                  {profile.shortBio}
                </div>
              </div>
            </div>
          </div>
          <SectionHeader eyebrow="Identity Scan" title="CORE PROFILE" />
          <div className="space-y-4 text-sm leading-6 text-slate-200">
            {profile.highlights.map(({ topic, text }) => {
              const Icon = highlightIcons[topic];
              return (
                <div key={topic} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p>{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
