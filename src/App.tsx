import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Database, PanelLeft, ScanLine, X } from "lucide-react";
import { profile } from "./components/data/profile";
import { menuItems } from "./components/data/portfolioData";
import type { SectionId } from "./components/data/portfolioData";
import ProfileHero from "./components/ProfileHero";
import SkipLink from "./components/SkipLink";
import ExperienceSection from "./components/main/ExperienceSection";
import EducationSection from "./components/main/EducationSection";
import ResearchSection from "./components/main/ResearchSection";
import ProjectsSection from "./components/main/ProjectsSection";
import SkillsSection from "./components/main/SkillsSection";
import ContactSection from "./components/main/ContactSection";
import { useSectionNavigation } from "./components/main/useSectionNavigation";

export default function App({ scrollFrameRef }: { scrollFrameRef: React.RefObject<HTMLDivElement | null> }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const [showBoot, setShowBoot] = React.useState(() => !reduceMotion);
  const booting = showBoot && !reduceMotion;
  const headerRef = React.useRef<HTMLElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const { activeSection, navigateToSection } = useSectionNavigation(scrollFrameRef, headerRef);

  React.useEffect(() => {
    if (!booting) return;
    const timer = window.setTimeout(() => setShowBoot(false), 1050);
    return () => window.clearTimeout(timer);
  }, [booting]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [menuOpen]);

  const handleMenuClick = (id: SectionId) => {
    setMenuOpen(false);
    const navigate = () => navigateToSection(id, reduceMotion ? "instant" : "smooth");
    if (menuOpen) window.requestAnimationFrame(navigate);
    else navigate();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-[#031325] text-white selection:bg-cyan-300/30"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          closeMenu();
        }
      }}
    >
      {booting && <div role="status" className="sr-only">Loading portfolio</div>}
      <AnimatePresence>
        {booting ? (
          <motion.div
            key="boot"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#031325] px-6"
          >
            <div className="w-full max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] border border-cyan-300/20 bg-[#07172a]/95 p-8 shadow-2xl md:p-10"
              >
                <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-cyan-200">
                  <ScanLine className="h-4 w-4" /> Persona Portfolio System
                </div>
                <div className="text-4xl font-black italic leading-none md:text-6xl">{profile.name.toUpperCase()}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.24em] text-cyan-100/80">
                  Initializing secure profile interface...
                </div>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                    <span>Boot Sequence</span>
                    <span>100%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full border border-cyan-300/10 bg-[#031325]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: [0, 0.35, 0.72, 1] }}
                      transition={{ duration: 0.85, ease: "easeInOut" }}
                      className="h-full w-full origin-left bg-[linear-gradient(90deg,#38bdf8,#60a5fa,#93c5fd)]"
                    />
                  </div>
                </div>
                <div className="mt-8 grid gap-3 text-xs uppercase tracking-[0.22em] text-cyan-100/70 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Loading Modules</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Scanning Skills</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Rendering UI</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,168,255,0.20),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(0,212,255,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.07]" />

      <motion.div
        animate={reduceMotion ? { y: 0, rotate: 0 } : { y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute right-10 top-20 h-56 w-56 rounded-full border border-cyan-300/10 bg-cyan-400/10 blur-3xl"
      />

      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-20">
        <div className="absolute left-[-5%] top-8 h-24 w-[110%] rotate-[-8deg] bg-[#49a6ff]" />
        <div className="absolute left-[-10%] top-32 h-12 w-[120%] rotate-[6deg] bg-[#0b5fff]" />
        <div className="absolute bottom-24 left-[-5%] h-20 w-[110%] rotate-[-6deg] bg-[#1f7bff]" />
      </div>

      <button
        ref={menuButtonRef}
        inert={booting}
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="fixed top-4 right-4 z-50 grid size-11 place-items-center rounded-2xl border border-cyan-300/30 bg-[#08182d] shadow-xl lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls={menuOpen ? "mobile-section-menu" : undefined}
      >
        {menuOpen ? <X className="size-5 text-cyan-200" /> : <PanelLeft className="size-5 text-cyan-200" />}
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-40 bg-[#031325]/85 lg:hidden"
            onClick={closeMenu}
          >
            <motion.nav
              id="mobile-section-menu"
              aria-label="Portfolio sections"
              initial={{ x: 12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 12, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute top-17 right-4 left-4 ml-auto max-h-[calc(100dvh-9rem)] max-w-xs overflow-y-auto overscroll-y-contain rounded-3xl border border-cyan-300/30 bg-[#07172a] p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Portfolio sections</div>
              <div className="space-y-1.5">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    autoFocus={activeSection === item.id}
                    aria-current={activeSection === item.id ? "location" : undefined}
                    onClick={() => handleMenuClick(item.id)}
                    className={`min-h-11 w-full rounded-xl px-4 py-2 text-left text-sm font-bold uppercase tracking-[0.1em] transition-colors ${
                      activeSection === item.id
                        ? "bg-cyan-400 text-[#031325]"
                        : "bg-white/5 text-cyan-100 hover:bg-cyan-400/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main aria-label="Main portfolio" inert={booting || menuOpen} className="relative z-10 mx-auto w-full max-w-[100rem] px-4 pt-4 pb-6 sm:px-6 md:px-9 md:pt-8 lg:pb-24">
        <SkipLink targetId="about" onSkip={() => handleMenuClick("about")} />
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="top-4 z-30 mb-5 rounded-[2rem] border border-cyan-300/20 bg-[#07172a]/90 px-4 py-3 max-lg:pr-14 lg:sticky lg:mb-7 lg:backdrop-blur-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">{profile.name}</div>
              <div className="text-xl leading-tight font-black italic tracking-tight sm:text-2xl xl:whitespace-nowrap 2xl:text-4xl">PORTFOLIO // PERSONA 03</div>
            </div>
            <nav aria-label="Portfolio sections" className="hidden flex-wrap gap-2 lg:flex">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={() => handleMenuClick(item.id)}
                  className={`rounded-full px-2.5 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors xl:px-3 2xl:px-4 ${
                    activeSection === item.id
                      ? "bg-cyan-400 text-[#031325]"
                      : "bg-white/5 text-cyan-100 hover:bg-cyan-400/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.header>

        <ProfileHero onNavigate={handleMenuClick} />

        <section id="experience" aria-labelledby="experience-heading" tabIndex={-1} className="mt-8 grid scroll-mt-24 gap-5 md:mt-10 md:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ExperienceSection />
          <EducationSection />
        </section>

        <ResearchSection />
        <ProjectsSection />

        <section id="skills" aria-labelledby="skills-heading" tabIndex={-1} className="mt-8 grid scroll-mt-24 gap-5 md:mt-10 md:gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <SkillsSection />
          <ContactSection />
        </section>

        <footer className="mt-10 pb-4 text-center text-xs uppercase tracking-[0.25em] text-cyan-100/55">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Database className="h-3.5 w-3.5" /> Persona-styled portfolio system // {profile.name}
          </div>
        </footer>
      </main>
    </div>
  );
}
