import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type PortfolioProject } from "./components/data/portfolioData";

const profile = {
  name: "Kabir Dubey",
  title: "M.Sc. Cybersecurity Graduate | Security + Software Builder",
  location: "Vancouver, BC",
  linkedin: "linkedin.com/in/kabirdubey",
};

const experience = {
  role: "Cybersecurity / Information Security Intern",
  company: "Shoptaki",
  period: "Dec 2024 – May 2025",
  details:
    "Developed a hybrid TLS system using ECDH, Kyber-512, and AES-GCM. Built a React client and Go proxy/server for secure file and text transmission. Supported threat analysis, vulnerability assessments, incident response, log analysis, and network traffic investigation.",
};

const education = [
  {
    degree: "M.Sc. in Cybersecurity",
    school: "New York Institute of Technology",
    period: "May 2024 – December 2025",
    detail:
      "Focused on advanced network security, digital forensics, incident analysis, cryptography, and applied defensive security.",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Priyadarshini Bhagwati College of Engineering",
    period: "2017 – 2021",
    detail:
      "Built the technical foundation for software engineering, systems thinking, and applied computing projects.",
  },
];

const research = [
  "Adaptive Micro-Segmentation with Zero Trust for lateral movement detection",
  "Software Defined Networking using Mininet, FlowVisor, BCube topology, and OpenFlow rules",
  "Threat Detection & Incident Response using traffic and log analysis",
  "TCP/IP security labs with packet analysis, network monitoring, and mitigation",
  "Digital Forensics using Autopsy and Cellebrite",
  "Cloud and security architecture: load balancers, gateway security, secure system design",
];

const skills = [
  "Java", "C/C++", "JavaScript", "TypeScript", "React", "Angular",
  "Wireshark", "Nmap", "Scapy", "Snort", "Suricata", "Autopsy",
  "Firebase", "TensorFlow", "Linux", "Cloud Security",
  "Digital Forensics", "Threat Detection", "Post-Quantum Encryption",
];

const menuItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];


function renderContent(active: string,
  setSelectedProject: (project: PortfolioProject) => void) {
  const cardClass =
    "relative overflow-hidden rounded-2xl border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(15,34,61,0.9),rgba(8,21,40,0.85))] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]";

  const topGlow = (
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
  );

  switch (active) {
    case "about":
      return (
        <div className="space-y-4">
          <div className={cardClass}>
            {topGlow}
            <div className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">
              Profile Summary
            </div>
            <p className="mt-3 text-base leading-8 text-slate-200">
              M.Sc. Cybersecurity graduate with hands-on experience in network
              defense, cryptography, threat analysis, and secure software
              development.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cardClass}>
              {topGlow}
              <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                Class
              </div>
              <div className="mt-2 text-xl font-bold text-white">
                Cybersecurity
              </div>
            </div>

            <div className={cardClass}>
              {topGlow}
              <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                Base
              </div>
              <div className="mt-2 text-xl font-bold text-white">
                Vancouver, BC
              </div>
            </div>
          </div>
        </div>
      );

    case "experience":
  return (
    <div className="space-y-4">
      <div className={cardClass}>
        {topGlow}
        <div className="text-xl font-bold text-white">
          {experience.company} — {experience.role}
        </div>
        <div className="mt-1 text-sm text-cyan-200">
          {experience.period}
        </div>
        <p className="mt-3 leading-7 text-slate-200">
          {experience.details}
        </p>
      </div>
    </div>
  );

    case "education":
  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div key={edu.degree} className={cardClass}>
          {topGlow}
          <div className="text-xl font-bold text-white">
            {edu.degree}
          </div>
          <div className="mt-1 text-sm text-cyan-200">
            {edu.school}
          </div>
          <div className="mt-2 text-slate-200">{edu.period}</div>
          <p className="mt-2 text-sm text-slate-300">{edu.detail}</p>
        </div>
      ))}
    </div>
  );

    case "research":
  return (
    <div className="space-y-4">
      {research.map((item) => (
        <div key={item} className={cardClass}>
          {topGlow}
          <div className="text-slate-100">{item}</div>
        </div>
      ))}
    </div>
  );

    case "projects":
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <button
          key={project.title}
          type="button"
          onClick={() => setSelectedProject(project)}
          className={`${cardClass} block w-full cursor-pointer text-left`}
        >
          {topGlow}
          <div className="font-semibold text-slate-100">{project.title}</div>
          <div className="mt-1 text-xs text-cyan-300">{project.tag}</div>
        </button>
      ))}
    </div>
  );

    case "skills":
  return (
    <div className="space-y-4">
      <div className={cardClass}>
        {topGlow}
        <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
          Skills
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

    case "contact":
  return (
    <div className="space-y-4">
      <div className={cardClass}>
        {topGlow}
        <div className="text-slate-100">Location: {profile.location}</div>
      </div>

      <div className={cardClass}>
        {topGlow}
        <a className="text-slate-100 hover:underline" href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">
          LinkedIn: {profile.linkedin}
        </a>
      </div>

      <div className={cardClass}>
        {topGlow}
        <a className="text-slate-100 hover:underline" href="https://github.com/kabeeraaa" target="_blank" rel="noreferrer">
          GitHub: github.com/kabeeraaa
        </a>
      </div>
    </div>
  );

    default:
      return null;
  }
}

export default function GamePortfolio() {
  const [active, setActive] = useState("about");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleAvatarMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = avatarRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 18;
    const rotateX = (0.5 - py) * 18;

    setTilt({ x: rotateX, y: rotateY });
  };

  const resetAvatarMove = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-screen w-screen overflow-hidden bg-[#031325] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-20 left-[28%] h-[70%] w-px bg-cyan-300/10" />
      <div className="absolute top-20 left-[62%] h-[70%] w-px bg-cyan-300/10" />

      <div className="relative flex h-full w-full">
        <div
          className="relative h-full w-[35%] overflow-hidden bg-[linear-gradient(135deg,#07172a,#031325)]"
          onMouseMove={handleAvatarMove}
          onMouseLeave={resetAvatarMove}
        >
          <div className="absolute inset-0 rounded-[2rem] border border-cyan-300/10" />
          <div className="absolute left-0 top-0 h-16 w-16 border-l border-t border-cyan-300/40" />
          <div className="absolute right-0 top-0 h-16 w-16 border-r border-t border-cyan-300/40" />
          <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-cyan-300/40" />
          <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-cyan-300/40" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

          <div className="absolute left-10 top-10 select-none text-[12rem] font-black italic text-white/5">
            K
          </div>

          <div className="absolute left-[-100px] top-[80px] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="relative flex h-full items-end justify-center pb-14">
            <motion.div
              ref={avatarRef}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1.5, 0],
                rotateX: tilt.x,
                rotateY: tilt.y,
                x: tilt.y * 1.5,
              }}
              transition={{
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                rotateX: { duration: 0.18, ease: "easeOut" },
                rotateY: { duration: 0.18, ease: "easeOut" },
                x: { duration: 0.18, ease: "easeOut" },
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative mb-12 flex flex-col items-center"
            >
              <div className="absolute left-0 top-0 h-full w-[2px] bg-cyan-300/20 animate-scan" />
              <div className="absolute left-1/2 top-1/2 h-[2px] w-[260px] -translate-x-1/2 -translate-y-1/2 bg-cyan-300/40 blur-[1px] animate-pulse" />

              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute h-[260px] w-[260px] rounded-full bg-cyan-300/20 blur-3xl"
              />

              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    animate={{
                      x: tilt.y * 2,
                      y: tilt.x * -2,
                    }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute h-[240px] w-[240px] rounded-full bg-cyan-300/20 blur-3xl"
                  />

                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="relative h-[220px] w-[160px]"
                  >
                    <div className="absolute bottom-20 h-6 w-40 rounded-full bg-black/40 blur-xl" />
                    <div className="absolute inset-x-6 top-0 h-20 rounded-t-[80px] bg-cyan-200/90" />
                    <div className="absolute inset-x-4 top-0 h-16 rounded-t-[80px] bg-cyan-300" />
                    <div className="absolute inset-x-6 top-6 h-24 rounded-b-[80px] bg-[#0a1628]" />

                    <div className="absolute inset-x-0 top-10 h-[2px] bg-cyan-300/40 blur-sm animate-pulse" />

                    <motion.div
                      animate={{
                        x: tilt.y * 1.2,
                        y: tilt.x * 1.2,
                        opacity: [1, 0.4, 1],
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute left-10 top-12 h-3 w-6 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                    />

                    <motion.div
                      animate={{
                        x: tilt.y * 1.2,
                        y: tilt.x * 1.2,
                        opacity: [1, 0.4, 1],
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute right-10 top-12 h-3 w-6 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-28 rounded-t-[60px] border border-cyan-300/10 bg-[linear-gradient(180deg,#0f223d,#09172a)]" />
                    <div className="absolute left-1/2 bottom-6 h-10 w-10 -translate-x-1/2 rotate-45 border border-cyan-300/20 bg-cyan-300/10" />
                  </motion.div>
                </div>
              </motion.div>

              <div className="mt-10 text-center">
                <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                  Operator
                </div>
                <div className="mt-2 text-4xl font-black italic">
                  Kabir Dubey
                </div>
                <div className="mt-2 text-cyan-100/80">
                  Cybersecurity / Software
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex h-full w-[30%] flex-col justify-center gap-4 pl-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`relative cursor-pointer select-none transition-all duration-200 ${
                active === item.id
                  ? "translate-x-3 scale-105"
                  : "hover:translate-x-2 hover:scale-105"
              }`}
              style={{
                transform: `skewX(-18deg) ${
                  active === item.id ? "translateX(12px) scale(1.05)" : ""
                }`,
              }}
            >
              <div
                className={`relative overflow-hidden px-8 py-4 text-3xl font-black italic uppercase tracking-wide ${
                  active === item.id
                    ? "menu-glow bg-cyan-400 text-[#031325] shadow-[0_0_40px_rgba(34,211,238,0.45)] ring-1 ring-cyan-300/20"
                    : "border border-white/5 bg-[#0b2241]/60 text-white/60 hover:text-white"
                }`}
              >
                <div className="absolute inset-0 opacity-0 transition duration-300 hover:opacity-100 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-sm" />
                <div
                  style={{ transform: "skewX(18deg)" }}
                  className="relative z-10 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {active === item.id && (
                    <span className="ml-4 animate-pulse font-bold text-black">
                      ➤
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex h-full w-[35%] items-center p-10">
          <div className="relative w-full min-h-[420px] overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(19,37,66,0.88),rgba(10,24,45,0.92))] p-8 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
            <div className="absolute right-0 top-0 h-24 w-24 bg-cyan-300/10 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.35em] text-cyan-200/70">
                    Active Screen
                  </div>
                  <div className="mt-2 text-3xl font-black italic tracking-wide text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    {active.toUpperCase()}
                  </div>
                </div>

                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100">
                  Enter
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  {renderContent(active, setSelectedProject)}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex justify-between text-[10px] uppercase tracking-[0.3em] text-cyan-100/50">
                <span>Scene Loaded</span>
                <span>Kabir Dubey Interface</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-[90%] max-w-xl rounded-2xl border border-cyan-300/20 bg-[#07172a] p-6 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-cyan-300">
                {selectedProject.title}
              </h2>

              <p className="mt-2 text-sm text-cyan-200">
                {selectedProject.tag}
              </p>

              
              <p className="mt-4 text-slate-300">
  {selectedProject.description}
</p>

<div className="mt-4 flex flex-wrap gap-2">
  {selectedProject.tech?.map((tech: string) => (
    <span
      key={tech}
      className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-200"
    >
      {tech}
    </span>
  ))}
</div>

              {selectedProject.href && (
                <a href={selectedProject.href} target="_blank" rel="noreferrer" className="mt-4 inline-block font-semibold text-cyan-200 hover:underline">
                  View {selectedProject.title} on GitHub
                </a>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 text-cyan-300 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
