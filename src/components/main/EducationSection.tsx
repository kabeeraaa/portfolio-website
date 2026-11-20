import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "../data/academics";
import SectionHeader from "../SectionHeader";

export default function EducationSection() {
  return (
    <div className="grid gap-8">
      <motion.section
        id="education"
        aria-labelledby="education-heading"
        tabIndex={-1}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="scroll-mt-24 rounded-[2rem] border border-cyan-300/20 bg-white/5 p-5 md:p-8"
      >
        <SectionHeader
          id="education-heading"
          eyebrow="Academics"
          title="EDUCATION"
          subtitle="Formal education that anchors the security, systems, and software work shown across the site."
        />
        <div className="space-y-4">
          {education.map((item, idx) => (
            <motion.div
              key={`${item.degree}-${item.school}`}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#0b2241]/85 p-5"
            >
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                <div>
                  <div className="text-lg font-bold italic">{item.degree}</div>
                  <div className="mt-1 text-sm uppercase tracking-[0.18em] text-cyan-200">{item.school}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-300">
                    {item.location} • {item.period}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{item.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="rounded-[2rem] border border-cyan-300/20 bg-white/5 p-5 md:p-8"
      >
        <SectionHeader eyebrow="Credentials" title="CERTIFICATIONS" />
        <div className="grid gap-3">
          {certifications.map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#091c34]/80 px-4 py-4"
            >
              <Award className="h-5 w-5 shrink-0 text-cyan-300" />
              <span className="text-sm text-slate-100">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
