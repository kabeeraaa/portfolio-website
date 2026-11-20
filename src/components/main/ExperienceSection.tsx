import { motion } from "framer-motion";
import { experience } from "../data/experience";
import SectionHeader from "../SectionHeader";

export default function ExperienceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="min-w-0 rounded-[2rem] border border-cyan-300/20 bg-[#08182d]/90 p-5 md:p-8"
    >
      <SectionHeader
        id="experience-heading"
        eyebrow="Battle Record"
        title="EXPERIENCE LOG"
        subtitle="Security internship experience focused on secure communication, research, auditing, and incident support."
      />
      <div className="space-y-5">
        {experience.map((item) => (
          <article key={`${item.role}-${item.org}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-2">
              <div>
                <h3 className="text-lg leading-snug font-bold italic">{item.role}</h3>
                <div className="mt-1 text-sm font-semibold text-cyan-200">{item.org}</div>
              </div>
              <div className="flex flex-wrap gap-x-3 text-sm text-slate-300">
                <div>{item.period}</div>
                <div>{item.location}</div>
              </div>
            </div>
            <ul className="mt-4 space-y-3 border-t border-cyan-300/15 pt-4 text-sm leading-relaxed text-slate-200">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
