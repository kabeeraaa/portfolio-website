import { lazy, Suspense, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import MainPortfolio from "./App";

const GamePortfolio = lazy(() => import("./GamePortfolio"));

const modes = [
  { hash: "#/", label: "Main" },
  { hash: "#/game", label: "Game" },
] as const;

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getMode() {
  return window.location.hash === "#/game" ? "#/game" : "#/";
}

export default function PortfolioShell() {
  const route = useSyncExternalStore(subscribeToHash, getMode);
  const reduceMotion = useReducedMotion();
  const isGame = route === "#/game";
  const scrollFrameRef = useRef<HTMLDivElement>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="max-lg:grid max-lg:h-dvh max-lg:grid-rows-[minmax(0,1fr)_auto] max-lg:overflow-hidden">
        <nav aria-label="Portfolio mode" className="z-[9999] max-lg:row-start-2 max-lg:flex max-lg:justify-end max-lg:border-t max-lg:border-cyan-300/20 max-lg:bg-[#031325] max-lg:px-4 max-lg:pt-2 max-lg:pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:fixed lg:bottom-5 lg:right-5">
          <div className="relative flex rounded-2xl border border-cyan-300/20 bg-[#07172a]/80 p-1 backdrop-blur-md">
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{ x: isGame ? 72 : 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 26 }}
              className="absolute inset-y-1 left-1 w-[72px] rounded-xl bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.35)]"
            />
            {modes.map(({ hash, label }) => (
              <a
                key={hash}
                href={hash}
                aria-current={route === hash ? "page" : undefined}
                className={`relative z-10 w-[72px] rounded-xl px-4 py-2 text-center text-sm font-bold transition max-lg:grid max-lg:min-h-11 max-lg:place-items-center ${
                  route === hash ? "text-black" : "text-white/80 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div ref={scrollFrameRef} data-portfolio-scroll-frame className="min-w-0 max-lg:row-start-1 max-lg:min-h-0 max-lg:overflow-x-hidden max-lg:overflow-y-auto max-lg:overscroll-y-contain lg:overflow-x-clip">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={route}
              className="max-lg:h-full"
              initial={{ opacity: 0, x: isGame ? 120 : -120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isGame ? -120 : 120 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
            >
              {isGame ? (
                <Suspense fallback={<div role="status" className="grid h-full place-items-center text-sm text-cyan-100 lg:h-dvh">Loading Game…</div>}>
                  <GamePortfolio />
                </Suspense>
              ) : <MainPortfolio scrollFrameRef={scrollFrameRef} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
