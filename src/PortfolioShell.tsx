import { lazy, Suspense, useSyncExternalStore } from "react";
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

  return (
    <MotionConfig reducedMotion="user">
      <nav aria-label="Portfolio mode" className="fixed bottom-5 right-5 z-[9999]">
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
              className={`relative z-10 w-[72px] rounded-xl px-4 py-2 text-center text-sm font-bold transition ${
                route === hash ? "text-black" : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={route}
          initial={{ opacity: 0, x: isGame ? 120 : -120 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isGame ? -120 : 120 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
        >
          {isGame ? (
            <Suspense fallback={<div role="status" className="grid h-dvh place-items-center text-sm text-cyan-100">Loading Game…</div>}>
              <GamePortfolio />
            </Suspense>
          ) : <MainPortfolio />}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
