import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectRepositoryLink from "../ProjectRepositoryLink";
import SectionHeader from "../SectionHeader";

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" tabIndex={-1} className="mt-8 scroll-mt-24 rounded-[2rem] border border-cyan-300/20 bg-white/5 p-5 md:mt-10 md:p-8">
      <SectionHeader
        id="projects-heading"
        eyebrow="Mission Select"
        title="FEATURED PROJECTS"
        subtitle="A mix of machine learning, cloud/mobile integration, and full-stack development work with a more game-like battle UI feel."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: idx * 0.07 }}
            className="relative flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-cyan-200/20 bg-[#0b2241]/85 p-4 shadow-lg sm:p-5 md:p-6"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 bg-cyan-300/10 blur-2xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="text-xs font-semibold text-cyan-200">{project.tag}</div>
            <h3 className="mt-1.5 text-xl leading-snug font-bold italic">{project.title}</h3>
            <p className="mt-3 grow text-sm leading-relaxed text-slate-200">{project.description}</p>
            <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2 border-t border-cyan-300/15 pt-4">
              {project.tech.map((technology) => (
                <li key={technology} className="rounded-full border border-cyan-300/20 bg-[#0a1e38] px-2.5 py-1 text-xs text-cyan-100">
                  {technology}
                </li>
              ))}
            </ul>
            {project.repositoryUrl && <ProjectRepositoryLink href={project.repositoryUrl} title={project.title} />}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
