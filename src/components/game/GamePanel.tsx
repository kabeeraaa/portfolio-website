import type { ReactNode, RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { certifications, education, researchWork } from "../data/academics";
import { experience } from "../data/experience";
import { contact, profile } from "../data/profile";
import type { SectionId } from "../data/portfolioData";
import { projects, type ProjectItem } from "../data/projects";
import { skillGroups } from "../data/skills";

const cardClass =
  "relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(15,34,61,0.9),rgba(8,21,40,0.85))]";

const cardPadding = "p-4 2xl:p-5";

const topGlow = (
  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
);

function GameDisclosure({ title, name, children }: { title: string; name?: string; children: ReactNode }) {
  return (
    <details name={name} className={`group ${cardClass} open:border-cyan-300/35`}>
      <summary className={`flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold leading-snug text-slate-100 transition-colors hover:bg-cyan-300/10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-cyan-300 [&::-webkit-details-marker]:hidden ${cardPadding}`}>
        {topGlow}
        <span>{title}</span>
        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-cyan-300 transition-transform group-open:rotate-90" />
      </summary>
      <div className="px-4 pb-4 text-sm leading-relaxed text-slate-200 2xl:px-5 2xl:pb-5">{children}</div>
    </details>
  );
}

type GamePanelContentProps = {
  active: SectionId;
  onSelectProject: (project: ProjectItem) => void;
};

function GamePanelContent({ active, onSelectProject }: GamePanelContentProps) {
  switch (active) {
    case "about":
      return (
        <div className="space-y-3">
          <div className={`${cardClass} ${cardPadding}`}>
            {topGlow}
            <div className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Profile Summary</div>
            <p className="mt-2 text-base leading-relaxed text-slate-200">{profile.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Class", profile.discipline],
              ["Base", contact.location],
            ].map(([label, value]) => (
              <div key={label} className={`${cardClass} ${cardPadding}`}>
                {topGlow}
                <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">{label}</div>
                <div className="mt-1 break-words text-sm font-bold text-white sm:text-base">{value}</div>
              </div>
            ))}
          </div>
          <GameDisclosure title="Core Profile">
            <p>{profile.title}</p>
            <p className="mt-2">{profile.shortBio}</p>
            <ul className="mt-3 list-disc space-y-2 pl-4">
              {profile.highlights.map(({ topic, text }) => <li key={topic}>{text}</li>)}
            </ul>
            <p className="mt-3 text-cyan-200">{profile.status}</p>
          </GameDisclosure>
        </div>
      );

    case "experience":
      return (
        <div className="space-y-3">
          {experience.map(({ org, role, period, location, bullets: [lead, ...responsibilities] }) => (
            <div key={`${org}-${role}`} className={`${cardClass} ${cardPadding}`}>
              {topGlow}
              <h3 className="text-lg leading-snug font-bold text-white 2xl:text-xl">{org} — {role}</h3>
              <p className="mt-2 text-sm text-cyan-200">{period} • {location}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{lead}</p>
              <div className="mt-4">
                <GameDisclosure title="Additional responsibilities">
                  <ul className="list-disc space-y-2 pl-4">
                    {responsibilities.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </GameDisclosure>
              </div>
            </div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="space-y-3">
          {education.map(({ degree, school, location, period, highlight }) => (
            <div key={degree} className={`${cardClass} ${cardPadding}`}>
              {topGlow}
              <h3 className="text-lg leading-snug font-bold text-white 2xl:text-xl">{degree}</h3>
              <p className="mt-1 text-sm text-cyan-200">{school}</p>
              <p className="mt-2 text-sm text-slate-300">{location} • {period}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{highlight}</p>
            </div>
          ))}
          <GameDisclosure title="Certifications">
            <ul className="list-disc space-y-2 pl-4">
              {certifications.map((certification) => <li key={certification}>{certification}</li>)}
            </ul>
          </GameDisclosure>
        </div>
      );

    case "research":
      return (
        <div className="space-y-3">
          {researchWork.map(({ title, description, details }) => (
            <GameDisclosure key={title} title={title} name="game-research">
              <p className="text-slate-300">{description}</p>
              <p className="mt-2">{details}</p>
            </GameDisclosure>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="space-y-3">
          {projects.map((project) => (
            <button
              key={project.title}
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => {
                event.currentTarget.focus({ preventScroll: true });
                onSelectProject(project);
              }}
              className={`${cardClass} ${cardPadding} w-full cursor-pointer text-left transition-colors hover:border-cyan-300/50 focus-visible:outline-offset-[-3px]`}
            >
              {topGlow}
              <span className="block leading-snug font-semibold text-slate-100">{project.title}</span>
              <span className="mt-1 block text-sm text-cyan-200">{project.tag}</span>
            </button>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="space-y-3">
          {skillGroups.map(({ title, items }) => (
            <GameDisclosure key={title} title={title} name="game-skills">
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li key={skill} className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-200">
                    {skill}
                  </li>
                ))}
              </ul>
            </GameDisclosure>
          ))}
        </div>
      );

    case "contact":
      return (
        <div className="space-y-3">
          {([["LinkedIn", contact.linkedin], ["GitHub", contact.github]] as const).map(([label, link]) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} ${cardPadding} block break-words text-slate-100 transition-colors hover:border-cyan-300/50 focus-visible:outline-offset-[-3px]`}
            >
              {topGlow}
              {label}: {link.label}
            </a>
          ))}
          <div className={`${cardClass} ${cardPadding}`}>
            {topGlow}
            <p className="text-slate-100">Location: {contact.location}</p>
          </div>
        </div>
      );
  }
}

type GamePanelProps = GamePanelContentProps & {
  panelRef: RefObject<HTMLElement | null>;
};

export default function GamePanel({ active, panelRef, onSelectProject }: GamePanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-0 min-w-0 px-4 pt-3 lg:mb-20 lg:px-5 lg:pt-7 2xl:px-8">
      <section
        ref={panelRef}
        id="game-panel"
        aria-labelledby="game-panel-heading"
        tabIndex={0}
        className="relative my-auto max-h-full w-full scroll-mt-3 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(19,37,66,0.88),rgba(10,24,45,0.92))] p-4 shadow-[0_0_45px_rgba(34,211,238,0.12)] focus-visible:outline-offset-[-4px] sm:p-5 lg:overflow-y-auto lg:overscroll-y-contain lg:[scrollbar-color:#28677e_transparent] lg:[scrollbar-width:thin] 2xl:p-7"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        <div className="absolute right-0 top-0 h-24 w-24 bg-cyan-300/10 blur-2xl" />

        <div className="relative z-10">
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => panelRef.current?.scrollTo({ top: 0, behavior: "instant" })}
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: reduceMotion ? 0 : 0.1 } }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              <header className="mb-4 border-b border-cyan-300/15 pb-3">
                <div className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Active Screen</div>
                <h2 id="game-panel-heading" className="mt-1 text-3xl leading-tight font-black italic tracking-wide text-white">
                  {active.toUpperCase()}
                </h2>
              </header>
              <GamePanelContent active={active} onSelectProject={onSelectProject} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100/65">
            <span>Scene Loaded</span>
            <span>{profile.name} Interface</span>
          </div>
        </div>
      </section>
    </div>
  );
}
