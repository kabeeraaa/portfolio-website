import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { menuItems } from "../data/portfolioData";
import type { SectionId } from "../data/portfolioData";

type GameMenuProps = { active: SectionId; onSelect: (section: SectionId, revealPanel: boolean) => void };

export default function GameMenu({ active, onSelect }: GameMenuProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabStop, setTabStop] = useState<SectionId>(active);

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = menuItems.length - 1;
    let next: number;

    switch (event.key) {
      case "ArrowDown": next = index === last ? 0 : index + 1; break;
      case "ArrowUp": next = index === 0 ? last : index - 1; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }

    event.preventDefault();
    buttons.current[next]?.focus();
  };

  return (
    <nav aria-label="Game sections" aria-describedby="game-menu-instructions" className="relative z-10 flex min-h-0 min-w-0 overflow-auto overscroll-contain">
      <p id="game-menu-instructions" className="sr-only">Use the Up and Down arrow keys to move. Press Enter or Space to select a section.</p>
      <div className="m-auto grid w-full grid-cols-2 gap-2.5 px-6 py-4 lg:grid-cols-1 lg:gap-3 lg:px-7">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            ref={(button) => { buttons.current[index] = button; }}
            type="button"
            tabIndex={tabStop === item.id ? 0 : -1}
            aria-pressed={active === item.id}
            aria-controls="game-panel"
            onFocus={() => setTabStop(item.id)}
            onKeyDown={(event) => moveFocus(event, index)}
            onClick={(event) => {
              setTabStop(item.id);
              onSelect(item.id, event.detail > 0);
            }}
            className={`relative min-w-0 skew-x-[-18deg] cursor-pointer select-none text-left transition-transform duration-200 focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white ${
              active === item.id
                ? "lg:translate-x-1 lg:scale-[1.02]"
                : "lg:hover:translate-x-1"
            }`}
          >
            <span
              className={`relative block min-h-11 overflow-hidden border px-2 py-3 text-sm font-black italic uppercase leading-tight tracking-wide sm:px-4 sm:text-xl lg:py-4 xl:px-5 xl:text-[clamp(1.375rem,2.15vw,1.875rem)] ${
                active === item.id
                  ? "menu-glow border-cyan-100/65 bg-cyan-400 text-[#031325] shadow-[0_0_28px_rgba(34,211,238,0.35)]"
                  : "border-cyan-100/10 bg-[#0b2241]/70 text-slate-200 hover:border-cyan-300/40 hover:text-white"
              }`}
            >
              <span className="relative z-10 flex skew-x-[18deg] items-center justify-between">
                <span>{item.label}</span>
                {active === item.id && (
                  <span aria-hidden="true" className="ml-1 shrink-0 text-xs font-bold text-[#031325] sm:text-base">
                    ➤
                  </span>
                )}
              </span>
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
