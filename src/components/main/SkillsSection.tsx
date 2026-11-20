import { motion } from "framer-motion";
import { Code2, Lock, Shield, TerminalSquare } from "lucide-react";
import { skillGroups } from "../data/skills";
import SectionHeader from "../SectionHeader";

const categoryIcons = { Programming: TerminalSquare, Security: Shield, Development: Code2, Domains: Lock };

export default function SkillsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="min-w-0 rounded-[2rem] border border-cyan-300/20 bg-white/5 p-5 md:p-8"
    >
      <SectionHeader
        id="skills-heading"
        eyebrow="Skill Matrix"
        title="CORE SKILLS"
        subtitle="Selected technical skills and domains pulled from the resume and grouped for a cleaner portfolio view."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, idx) => {
          const Icon = categoryIcons[group.title];
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#091c34]/80 p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon className="h-5 w-5 text-cyan-300" />
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">{group.title}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cyan-300/20 bg-[#0a1e38] px-3 py-1.5 text-xs font-semibold text-cyan-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
