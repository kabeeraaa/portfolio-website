import { motion, useReducedMotion } from "framer-motion";
import { GitFork, MapPin } from "lucide-react";
import { contact } from "../data/profile";
import LinkedInMark from "../LinkedInMark";
import SectionHeader from "../SectionHeader";

const contactLinkClass = "flex min-h-11 items-center gap-3 rounded-xl border border-[#031325]/20 bg-white/15 px-3 py-2.5 transition-colors hover:bg-white/35 focus-visible:outline-[#031325]";

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-heading"
      tabIndex={-1}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className="relative min-w-0 scroll-mt-24 self-start overflow-hidden rounded-[2rem] border border-cyan-300/30 bg-linear-to-br from-[#72c5ff] to-[#53b2ff] p-5 text-[#031325] shadow-2xl md:p-8"
    >
      <motion.div
        animate={reduceMotion ? { x: 0, opacity: 0.18 } : { x: [0, 16, 0], opacity: [0.18, 0.28, 0.18] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/40 blur-3xl"
      />

      <div className="relative z-10">
        <SectionHeader
          id="contact-heading"
          onLightBackground
          eyebrow="Contact"
          title="LET'S BUILD SOMETHING SECURE."
          subtitle="Looking for someone who can combine security thinking with practical software engineering and hands-on implementation? Let’s connect."
        />
        <div className="space-y-2.5 text-sm font-semibold md:text-base">
          <a href={contact.linkedin.href} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
            <LinkedInMark className="size-5 shrink-0" />
            <span className="wrap-anywhere">{contact.linkedin.label}</span>
          </a>
          <a href={contact.github.href} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
            <GitFork aria-hidden="true" className="size-5 shrink-0" />
            <span className="wrap-anywhere">{contact.github.label}</span>
          </a>
          <p className="flex items-center gap-3 px-3 pt-2">
            <MapPin aria-hidden="true" className="size-5 shrink-0" /> {contact.location}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
