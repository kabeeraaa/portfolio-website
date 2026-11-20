import { useLayoutEffect, useRef } from "react";
import type { ProjectItem } from "../data/projects";
import ProjectRepositoryLink from "../ProjectRepositoryLink";

export default function ProjectDialog({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      aria-describedby="project-dialog-category"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const dialog = event.currentTarget;
        const { left, right, top, bottom } = dialog.getBoundingClientRect();
        if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
          dialog.close();
        }
      }}
      className="project-dialog m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-xl flex-col overflow-hidden rounded-2xl border border-cyan-300/30 bg-[#07172a] p-0 text-white open:flex backdrop:bg-black/75 sm:w-[90%]"
    >
      <header className="relative border-b border-cyan-300/15 p-4 pr-16 sm:p-6 sm:pr-18">
        <h2 id="project-dialog-title" className="text-xl leading-snug font-bold text-cyan-300 sm:text-2xl">
          {project.title}
        </h2>
        <p id="project-dialog-category" className="mt-1 text-sm text-cyan-200">{project.tag}</p>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close project details"
          onClick={() => dialogRef.current?.close()}
          className="absolute top-2 right-2 grid size-11 cursor-pointer place-items-center rounded-lg text-cyan-300 transition-colors hover:bg-cyan-300/10 hover:text-white sm:top-3 sm:right-3"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </header>
      <section
        aria-label="Project description and technologies"
        tabIndex={0}
        className="min-h-0 overflow-y-auto overscroll-y-contain p-4 focus-visible:outline-offset-[-3px] sm:p-6"
      >
        <p className="leading-relaxed text-slate-200">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-full border border-cyan-300/25 px-3 py-1 text-xs text-cyan-200">
              {tech}
            </li>
          ))}
        </ul>
        {project.repositoryUrl && <ProjectRepositoryLink href={project.repositoryUrl} title={project.title} />}
      </section>
    </dialog>
  );
}
