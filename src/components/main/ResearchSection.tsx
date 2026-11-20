import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { researchWork } from "../data/academics";
import SectionHeader from "../SectionHeader";

export default function ResearchSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="research" aria-labelledby="research-heading" tabIndex={-1} className="mt-8 scroll-mt-24 rounded-[2rem] border border-cyan-300/20 bg-white/5 p-5 md:mt-10 md:p-8">
      <SectionHeader
        id="research-heading"
        eyebrow="Operations"
        title="RESEARCH & ACADEMIC WORK"
        subtitle="Advanced cybersecurity research, simulations, and hands-on lab work from my Master's program."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {researchWork.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className={`overflow-hidden rounded-[1.5rem] border bg-[#0b2241]/85 ${activeIndex === idx ? "border-cyan-300/40" : "border-cyan-200/15"}`}
          >
            <button
              type="button"
              aria-expanded={activeIndex === idx}
              aria-controls={`research-details-${idx}`}
              onClick={() => setActiveIndex((current) => current === idx ? null : idx)}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-cyan-400/10 aria-expanded:bg-cyan-400/10 focus-visible:outline-offset-[-3px] sm:p-5"
            >
              <span className="leading-snug font-bold italic sm:text-lg">{item.title}</span>
              <ChevronRight aria-hidden="true" className={`size-4 shrink-0 text-cyan-200 transition-transform ${activeIndex === idx ? "rotate-90" : ""}`} />
            </button>

            <motion.div
              id={`research-details-${idx}`}
              aria-hidden={activeIndex !== idx}
              initial={false}
              animate={{ height: activeIndex === idx ? "auto" : 0, opacity: activeIndex === idx ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              className="overflow-hidden px-4 text-sm leading-relaxed sm:px-5"
            >
              <p className="pt-4 pb-2 font-medium text-cyan-100">{item.description}</p>
              <p className="pb-4 text-slate-200 sm:pb-5">{item.details}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
