import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

import MainPortfolio from "./App";
import GamePortfolio from "./GamePortfolio";

function Root() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goTo = (path: "#/" | "#/game") => {
    window.location.hash = path;
    setRoute(path);
  };

  return (
    <>
      {/* 🎮 Toggle with animated slider */}
      <div className="fixed bottom-5 right-5 z-[9999]">
        <div className="relative flex rounded-2xl border border-cyan-300/20 bg-[#07172a]/80 p-1 backdrop-blur-md">

          {/* 🔥 Animated Slider */}
          <motion.div
            key={route}
            layout
            initial={{ scale: 0.92, opacity: 0.8 }}
            animate={{
              scale: 1,
              opacity: 1,
              boxShadow: [
                "0 0 10px rgba(34,211,238,0.4)",
                "0 0 28px rgba(34,211,238,0.85)",
                "0 0 14px rgba(34,211,238,0.55)",
              ],
            }}
            transition={{
              layout: {
                type: "spring",
                stiffness: 520,
                damping: 26,
              },
              scale: {
                type: "spring",
                stiffness: 420,
                damping: 18,
              },
              boxShadow: {
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`absolute top-1 bottom-1 w-[72px] rounded-xl bg-cyan-400 ${
              route === "#/game" ? "left-[77px]" : "left-1"
            }`}
          />

          {/* Main Button */}
          <button
            onClick={() => goTo("#/")}
            className={`relative z-10 w-[72px] rounded-xl px-4 py-2 text-sm font-bold transition ${
              route === "#/" ? "text-black" : "text-white/80 hover:text-white"
            }`}
          >
            Main
          </button>

          {/* Game Button */}
          <button
            onClick={() => goTo("#/game")}
            className={`relative z-10 w-[72px] rounded-xl px-4 py-2 text-sm font-bold transition ${
              route === "#/game"
                ? "text-black"
                : "text-white/80 hover:text-white"
            }`}
          >
            Game
          </button>
        </div>
      </div>


      
      
      {/* 🎬 Screen Transition */}
      <AnimatePresence mode="wait">
        {route === "#/game" ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -120 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <GamePortfolio />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 120 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <MainPortfolio />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);