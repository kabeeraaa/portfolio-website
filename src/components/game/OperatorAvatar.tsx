import { memo } from "react";
import type { MouseEvent } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { profile } from "../data/profile";

export default memo(function OperatorAvatar() {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 360, damping: 32 });
  const rotateY = useSpring(0, { stiffness: 360, damping: 32 });
  const avatarX = useTransform(rotateY, (tilt) => tilt * 1.5);
  const glowX = useTransform(rotateY, (tilt) => tilt * 2);
  const glowY = useTransform(rotateX, (tilt) => tilt * -2);
  const eyeX = useTransform(rotateY, (tilt) => tilt * 1.2);
  const eyeY = useTransform(rotateX, (tilt) => tilt * 1.2);

  const handleAvatarMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 18);
    rotateX.set((0.5 - py) * 18);
  };

  const resetAvatarMove = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className="relative min-h-0 overflow-hidden bg-[linear-gradient(135deg,#07172a,#031325)]"
      onMouseMove={handleAvatarMove}
      onMouseLeave={resetAvatarMove}
    >
      <div className="absolute inset-0 rounded-[2rem] border border-cyan-300/10" />
      <div className="absolute left-0 top-0 h-16 w-16 border-l border-t border-cyan-300/40" />
      <div className="absolute right-0 top-0 h-16 w-16 border-r border-t border-cyan-300/40" />
      <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-cyan-300/40" />
      <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-cyan-300/40" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      <div aria-hidden="true" className="absolute left-10 top-10 select-none text-[12rem] font-black italic text-white/5">
        {profile.name.charAt(0)}
      </div>

      <div className="absolute left-[-100px] top-[80px] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative flex h-full items-center justify-center py-4 lg:items-end lg:py-6 lg:pb-14">
        <motion.div
          animate={reduceMotion ? { y: 0, rotate: 0 } : { y: [0, -10, 0], rotate: [0, 1.5, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d", rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, x: reduceMotion ? 0 : avatarX }}
          className="relative flex flex-col items-center lg:mb-12"
        >
          <div className="absolute left-0 top-0 h-full w-[2px] bg-cyan-300/20 animate-scan" />
          <div className="absolute left-1/2 top-1/2 h-[2px] w-[260px] -translate-x-1/2 -translate-y-1/2 bg-cyan-300/40 blur-[1px] animate-pulse" />

          <motion.div
            animate={reduceMotion ? { scale: 1, opacity: 0.4 } : { scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute h-[260px] w-[260px] rounded-full bg-cyan-300/20 blur-3xl"
          />

          <motion.div
            animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="max-lg:-my-7 max-lg:scale-75"
          >
            <div className="flex flex-col items-center justify-center">
              <motion.div
                style={{ x: reduceMotion ? 0 : glowX, y: reduceMotion ? 0 : glowY }}
                className="absolute h-[240px] w-[240px] rounded-full bg-cyan-300/20 blur-3xl"
              />

              <motion.div
                animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative h-[220px] w-[160px]"
              >
                <div className="absolute bottom-20 h-6 w-40 rounded-full bg-black/40 blur-xl" />
                <div className="absolute inset-x-6 top-0 h-20 rounded-t-[80px] bg-cyan-200/90" />
                <div className="absolute inset-x-4 top-0 h-16 rounded-t-[80px] bg-cyan-300" />
                <div className="absolute inset-x-6 top-6 h-24 rounded-b-[80px] bg-[#0a1628]" />

                <div className="absolute inset-x-0 top-10 h-[2px] bg-cyan-300/40 blur-sm animate-pulse" />

                <motion.div
                  style={{ x: reduceMotion ? 0 : eyeX, y: reduceMotion ? 0 : eyeY }}
                  animate={{ opacity: reduceMotion ? 1 : [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute left-10 top-12 h-3 w-6 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                />

                <motion.div
                  style={{ x: reduceMotion ? 0 : eyeX, y: reduceMotion ? 0 : eyeY }}
                  animate={{ opacity: reduceMotion ? 1 : [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute right-10 top-12 h-3 w-6 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                />

                <div className="absolute inset-x-0 bottom-0 h-28 rounded-t-[60px] border border-cyan-300/10 bg-[linear-gradient(180deg,#0f223d,#09172a)]" />
                <div className="absolute left-1/2 bottom-6 h-10 w-10 -translate-x-1/2 rotate-45 border border-cyan-300/20 bg-cyan-300/10" />
              </motion.div>
            </div>
          </motion.div>

          <div className="mt-5 text-center lg:mt-10">
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
              Operator
            </div>
            <h1 className="mt-1 text-3xl font-black italic lg:mt-2 lg:text-4xl">{profile.name}</h1>
            <div className="mt-2 text-cyan-100/80">
              Cybersecurity / Software
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});
