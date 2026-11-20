import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SectionId } from "./components/data/portfolioData";
import type { ProjectItem } from "./components/data/projects";
import GameMenu from "./components/game/GameMenu";
import GamePanel from "./components/game/GamePanel";
import OperatorAvatar from "./components/game/OperatorAvatar";
import ProjectDialog from "./components/game/ProjectDialog";
import SkipLink from "./components/SkipLink";

export default function GamePortfolio() {
  const [active, setActive] = useState<SectionId>("about");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const selectSection = (section: SectionId, revealPanel: boolean) => {
    setActive(section);
    if (revealPanel && window.matchMedia("(max-width: 63.999rem)").matches) {
      panelRef.current?.scrollIntoView({ block: "start", behavior: reduceMotion ? "instant" : "smooth" });
    }
  };

  return (
    <motion.main
      aria-label="Game portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.6 }}
      className="relative h-dvh w-full overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#031325] text-white lg:overflow-hidden"
    >
      <SkipLink targetId="game-panel" onSkip={() => {
        panelRef.current?.focus({ preventScroll: true });
        panelRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-20 left-[28%] h-[70%] w-px bg-cyan-300/10" />
      <div className="absolute top-20 left-[62%] h-[70%] w-px bg-cyan-300/10" />

      <div className="relative grid min-h-full w-full content-start pb-24 lg:h-full lg:grid-cols-[31%_27%_42%] lg:grid-rows-[minmax(0,1fr)] lg:content-stretch lg:pb-0 2xl:grid-cols-[34%_28%_38%]">
        <OperatorAvatar />
        <GameMenu active={active} onSelect={selectSection} />
        <GamePanel active={active} panelRef={panelRef} onSelectProject={setSelectedProject} />
      </div>
      {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </motion.main>
  );
}
