import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Code2,
  Briefcase,
  ChevronRight,
  MapPin,
  GraduationCap,
  Award,
  TerminalSquare,
  Database,
  Lock,
  ScanLine,
  PanelLeft,
  UserCircle2,
  Sparkles,
} from "lucide-react";
import { projects } from "./components/data/portfolioData";

type Profile = {
  name: string;
  title: string;
  location: string;
  linkedin: string;
  summary: string;
};

type EducationItem = {
  degree: string;
  school: string;
  location: string;
  period: string;
  highlight: string;
};

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
};

type SkillGroup = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items: string[];
};

type ResearchItem = {
  title: string;
  description: string;
  details: string;
};

type SocialLinkItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string | null;
  value: string;
  external: boolean;
};

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

type SocialLinkCardProps = {
  item: SocialLinkItem;
  delay?: number;
};

const profile: Profile = {
  name: "Kabir Dubey",
  title: "M.Sc. Cybersecurity Graduate | Security + Software Builder",
  location: "Vancouver, BC",
  linkedin: "https://linkedin.com/in/kabirdubey",
  summary:
    "M.Sc. Cybersecurity graduate with hands-on experience in network defense, cryptography, threat analysis, and secure software development. I build practical systems that blend defensive security thinking with real engineering execution, from post-quantum secure communication to full-stack and machine learning projects.",
};

const education: EducationItem[] = [
  {
    degree: "M.Sc. in Cybersecurity",
    school: "New York Institute of Technology",
    location: "Vancouver, BC",
    period: "May 2024 – December 2025",
    highlight:
      "Focused on advanced network security, digital forensics, incident analysis, cryptography, and applied defensive security.",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Priyadarshini Bhagwati College of Engineering",
    location: "India",
    period: "2017 – 2021",
    highlight:
      "Built the technical foundation for software engineering, systems thinking, and applied computing projects.",
  },
];

const experience: ExperienceItem[] = [
  {
    role: "Cybersecurity / Information Security Intern",
    org: "Shoptaki",
    period: "Dec 2024 – May 2025",
    location: "New York, US",
    bullets: [
      "Developed a hybrid TLS system combining ECDH and post-quantum Kyber-512 key exchange with AES-GCM encryption to strengthen resistance against both classical and quantum attack scenarios.",
      "Built a React client and Go-based proxy/server for secure file and text transmission, while tracking round-trip and latency metrics to evaluate performance tradeoffs.",
      "Researched and implemented post-quantum encryption models at the network layer to improve resilience and security automation.",
      "Conducted threat analysis and vulnerability assessments, identifying security gaps and recommending mitigation strategies through auditing and technical review.",
      "Supported incident response and security research through log analysis, network traffic analysis, attack pattern investigation, and security architecture improvements involving load balancers and gateway solutions.",
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    icon: TerminalSquare,
    items: ["Java", "C/C++", "JavaScript", "TypeScript", "Swift", "PowerShell", "MySQL", "HTML5", "CSS3"],
  },
  {
    title: "Security",
    icon: Shield,
    items: ["Wireshark", "Nmap", "Scapy", "Snort", "Suricata", "Autopsy", "Cellebrite", "OWASP", "CVE", "CVSS"],
  },
  {
    title: "Development",
    icon: Code2,
    items: ["React", "Angular", "Firebase", "TensorFlow", "JUnit", "Android Studio", "Jupyter", "Linux"],
  },
  {
    title: "Domains",
    icon: Lock,
    items: [
      "Network Security",
      "Digital Forensics",
      "Threat Detection",
      "Vulnerability Management",
      "Cloud Security",
      "Post-Quantum Encryption",
      "IAM",
      "Malware Analysis",
    ],
  },
];

const certifications = [
  "Software Engineer Program – NIIT",
  "Google Cloud Ready Program",
  "Introduction to Cybersecurity – Cisco Networking Academy",
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

const researchWork: ResearchItem[] = [
  {
    title: "Adaptive Micro-Segmentation (Zero Trust)",
    description:
      "Researched adaptive micro-segmentation to limit lateral movement in networks.",
    details:
      "Explored how risk-based policies and least-privilege access can support network isolation.",
  },
  {
    title: "Software Defined Networking (Mininet + FlowVisor)",
    description: "Implemented BCube topology and FlowVisor slicing for network isolation.",
    details:
      "Configured bandwidth and delay using TCLink and enforced custom OpenFlow rules. Tested routing paths using ping and iperf to validate traffic engineering and segmentation behavior.",
  },
  {
    title: "Threat Detection & Incident Response",
    description: "Analyzed network traffic and logs to identify attack patterns.",
    details:
      "Used Wireshark and IDS tools to investigate anomalies, perform vulnerability assessments, and support incident response workflows with actionable insights.",
  },
  {
    title: "TCP/IP Security Labs",
    description: "Studied network traffic patterns and defensive controls in graduate labs.",
    details:
      "Reviewed packet captures and compared monitoring and mitigation approaches for suspicious TCP/IP traffic.",
  },
  {
    title: "Digital Forensics",
    description: "Hands-on experience with forensic tools and analysis.",
    details:
      "Used Autopsy and Cellebrite to analyze system artifacts and evidence, focusing on investigative workflows and data recovery.",
  },
  {
    title: "Cloud & Security Architecture",
    description: "Worked with secure infrastructure concepts.",
    details:
      "Explored load balancers, gateway security, and secure system design principles to improve overall architecture resilience.",
  },
];

function GitHubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.72-1.55-2.56-.29-5.26-1.29-5.26-5.74 0-1.27.45-2.31 1.19-3.13-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.19 1.2a10.9 10.9 0 0 1 5.8 0c2.22-1.51 3.19-1.2 3.19-1.2.63 1.58.23 2.75.11 3.04.74.82 1.19 1.86 1.19 3.13 0 4.46-2.7 5.45-5.28 5.73.41.36.78 1.08.78 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM3.5 8.5h2.96V20.5H3.5V8.5Zm7.01 0h2.84v1.64h.04c.4-.75 1.37-1.9 3.39-1.9 3.62 0 4.29 2.38 4.29 5.48v6.78h-2.96v-6.01c0-1.43-.03-3.27-1.99-3.27-2 0-2.31 1.56-2.31 3.17v6.11h-2.96V8.5Z" />
    </svg>
  );
}

const socialLinks: SocialLinkItem[] = [
  { icon: LinkedInMark, label: "LinkedIn", href: profile.linkedin, value: "linkedin.com/in/kabirdubey", external: true },
  { icon: GitHubMark, label: "GitHub", href: "https://github.com/kabeeraaa", value: "github.com/kabeeraaa", external: true },
];

const statCards = [
  ["Class", "Cybersecurity"],
  ["Base", profile.location],
  ["Role", "Security + Software"],
  ["Status", "Open to Opportunities"],
];

function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <div className="text-xs uppercase tracking-[0.35em] text-cyan-200">{eyebrow}</div>
      <div className="mt-2 text-2xl font-black italic md:text-3xl">{title}</div>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{subtitle}</p> : null}
    </div>
  );
}

function SocialLinkCard({ item, delay = 0 }: SocialLinkCardProps) {
  const Icon = item.icon;
  const commonClassName =
    "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-cyan-400/10";

  const content = (
    <>
      <div className="min-w-0 flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0 text-cyan-300" />
        <div className="min-w-0">
          <div className="font-semibold tracking-wide">{item.label}</div>
          <div className="truncate text-xs text-slate-300">{item.value}</div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-cyan-200/70" />
    </>
  );

  if (!item.href) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay }}
        className={`${commonClassName} cursor-default opacity-90`}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={commonClassName}
    >
      {content}
    </motion.a>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [activeSection, setActiveSection] = React.useState("about");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [booting, setBooting] = React.useState(true);

  const toggle = (index: number) => {
    setActiveIndex((current: number | null) => (current === index ? null : index));
  };

  React.useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-10% 0px -20% 0px" }
    );

    menuItems.forEach((item) => {
      const node = document.getElementById(item.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [booting]);

  const handleMenuClick = (id:string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031325] text-white selection:bg-cyan-300/30">
      <AnimatePresence>
        {booting ? (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031325] px-6"
          >
            <div className="w-full max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] border border-cyan-300/20 bg-[#07172a]/95 p-8 shadow-2xl md:p-10"
              >
                <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-cyan-200">
                  <ScanLine className="h-4 w-4" /> Persona Portfolio System
                </div>
                <div className="text-4xl font-black italic leading-none md:text-6xl">KABIR DUBEY</div>
                <div className="mt-3 text-sm uppercase tracking-[0.24em] text-cyan-100/80">
                  Initializing secure profile interface...
                </div>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                    <span>Boot Sequence</span>
                    <span>100%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full border border-cyan-300/10 bg-[#031325]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: ["0%", "35%", "72%", "100%"] }}
                      transition={{ duration: 1.55, ease: "easeInOut" }}
                      className="h-full bg-[linear-gradient(90deg,#38bdf8,#60a5fa,#93c5fd)]"
                    />
                  </div>
                </div>
                <div className="mt-8 grid gap-3 text-xs uppercase tracking-[0.22em] text-cyan-100/70 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Loading Modules</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Scanning Skills</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Rendering UI</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,168,255,0.20),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(0,212,255,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.07]" />

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute right-10 top-20 h-56 w-56 rounded-full border border-cyan-300/10 bg-cyan-400/10 blur-3xl"
      />

      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-20">
        <div className="absolute left-[-5%] top-8 h-24 w-[110%] rotate-[-8deg] bg-[#49a6ff]" />
        <div className="absolute left-[-10%] top-32 h-12 w-[120%] rotate-[6deg] bg-[#0b5fff]" />
        <div className="absolute bottom-24 left-[-5%] h-20 w-[110%] rotate-[-6deg] bg-[#1f7bff]" />
      </div>

      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="fixed right-5 top-5 z-50 rounded-2xl border border-cyan-300/20 bg-[#08182d]/90 p-3 shadow-xl lg:hidden"
        aria-label="Toggle menu"
      >
        <PanelLeft className="h-5 w-5 text-cyan-200" />
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#031325]/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-4 top-16 w-[280px] rounded-[2rem] border border-cyan-300/20 bg-[#07172a]/95 p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan-200">Menu Navigation</div>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.18em] transition ${
                      activeSection === item.id
                        ? "bg-cyan-400 text-[#031325]"
                        : "bg-white/5 text-cyan-100 hover:bg-cyan-400/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="relative z-10 w-full px-6 py-8 md:px-12 md:py-12">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="sticky top-4 z-30 mb-8 rounded-[2rem] border border-cyan-300/20 bg-[#07172a]/70 p-4 backdrop-blur-md"
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">Kabir Dubey</div>
              <div className="text-2xl font-black italic tracking-tight md:text-4xl">PORTFOLIO // PERSONA 03</div>
            </div>
            <div className="hidden flex-wrap gap-2 lg:flex">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition ${
                    activeSection === item.id
                      ? "bg-cyan-400 text-[#031325]"
                      : "bg-white/5 text-cyan-100 hover:bg-cyan-400/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>

       <section id="about" className="grid items-stretch gap-10 xl:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-10"
          >
            <motion.div
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
            />

            <div className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200">Player Profile</div>
            <h1 className="text-5xl font-black italic leading-none tracking-tight md:text-7xl">
              KABIR
              <br />
              DUBEY
            </h1>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.18em] text-cyan-100">
              <Shield className="h-4 w-4" />
              {profile.title}
            </div>

            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-200 md:text-lg">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => handleMenuClick("projects")}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#53b2ff] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#02101d] shadow-lg transition hover:scale-[1.03]"
              >
                View Projects <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleMenuClick("contact")}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                Contact Me
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map(([label, value], idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 + idx * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-[#091c34]/80 p-4"
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">{label}</div>
                  <div className="mt-2 text-sm font-semibold md:text-base">{value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid gap-6"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#0a1f3a]/90 p-6 shadow-2xl">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />
              <SectionHeader eyebrow="Direct Links" title="SOCIAL / CONTACT" />
              <div className="space-y-3">
                {socialLinks.map((item, idx) => (
                  <SocialLinkCard key={item.label} item={item} delay={0.35 + idx * 0.08} />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-300/20 bg-white/5 p-6 shadow-2xl">
              <SectionHeader eyebrow="Profile Visual" title="AVATAR PANEL" />
              <div className="relative mb-6 overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-[linear-gradient(135deg,#0b2241,#07172a)] p-6">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />
                <motion.div
                  animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl"
                />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
                    <UserCircle2 className="h-12 w-12 text-cyan-200" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">Operator</div>
                    <div className="text-2xl font-black italic">Kabir Dubey</div>
                    <div className="mt-1 text-sm text-slate-300">
                      Cybersecurity graduate focused on secure systems, detection, and practical engineering.
                    </div>
                  </div>
                </div>
              </div>
              <SectionHeader eyebrow="Identity Scan" title="CORE PROFILE" />
              <div className="space-y-4 text-sm leading-6 text-slate-200">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p>
                    Threat-focused mindset with practical experience in network defense, cryptography, vulnerability assessment, and security analysis.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p>
                    Hands-on builder across software, security tooling, full-stack development, research prototypes, and cloud-connected apps.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p>
                    Actively pursuing roles where security engineering, cybersecurity operations, and software development intersect.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="experience" className="mt-10 grid gap-8 scroll-mt-24 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-cyan-300/20 bg-[#08182d]/90 p-6 md:p-8"
          >
            <SectionHeader
              eyebrow="Battle Record"
              title="EXPERIENCE LOG"
              subtitle="Security internship experience focused on secure communication, research, auditing, and incident support."
            />
            <div className="space-y-5">
              {experience.map((item) => (
                <div key={`${item.role}-${item.org}`} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-lg font-bold italic">{item.role}</div>
                      <div className="mt-1 text-sm uppercase tracking-[0.2em] text-cyan-200">{item.org}</div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-300 md:text-right">
                      <div>{item.period}</div>
                      <div>{item.location}</div>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-8">
            <motion.div
              id="education"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="rounded-[2rem] border border-cyan-300/20 bg-white/5 p-6 scroll-mt-24 md:p-8"
            >
              <SectionHeader
                eyebrow="Academics"
                title="EDUCATION"
                subtitle="Formal education that anchors the security, systems, and software work shown across the site."
              />
              <div className="space-y-4">
                {education.map((item, idx) => (
                  <motion.div
                    key={`${item.degree}-${item.school}`}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-[#0b2241]/85 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                      <div>
                        <div className="text-lg font-bold italic">{item.degree}</div>
                        <div className="mt-1 text-sm uppercase tracking-[0.18em] text-cyan-200">{item.school}</div>
                        <div className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-300">
                          {item.location} • {item.period}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-200">{item.highlight}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="rounded-[2rem] border border-cyan-300/20 bg-white/5 p-6 md:p-8"
            >
              <SectionHeader eyebrow="Credentials" title="CERTIFICATIONS" />
              <div className="grid gap-3">
                {certifications.map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#091c34]/80 px-4 py-4"
                  >
                    <Award className="h-5 w-5 shrink-0 text-cyan-300" />
                    <span className="text-sm text-slate-100">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="research" className="mt-10 rounded-[2rem] border border-cyan-300/20 bg-white/5 p-6 scroll-mt-24 md:p-8">
          <SectionHeader
            eyebrow="Operations"
            title="RESEARCH & ACADEMIC WORK"
            subtitle="Advanced cybersecurity research, simulations, and hands-on lab work from my Master's program."
          />
          <div className="grid gap-4 xl:grid-cols-2">
            {researchWork.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="overflow-hidden rounded-[1.5rem] border border-cyan-200/15 bg-[#0b2241]/85"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-cyan-400/10"
                >
                  <span className="text-lg font-bold italic">{item.title}</span>
                  <ChevronRight className={`h-4 w-4 transition ${activeIndex === idx ? "rotate-90" : ""}`} />
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: activeIndex === idx ? "auto" : 0, opacity: activeIndex === idx ? 1 : 0 }}
                  className="overflow-hidden px-5"
                >
                  <p className="pb-2 text-sm text-slate-300">{item.description}</p>
                  <p className="pb-5 text-sm text-slate-200">{item.details}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-10 rounded-[2rem] border border-cyan-300/20 bg-white/5 p-6 scroll-mt-24 md:p-8">
          <SectionHeader
            eyebrow="Mission Select"
            title="FEATURED PROJECTS"
            subtitle="Software projects in web development, mobile, game development, and machine learning."
          />
          <div className="grid gap-4 xl:grid-cols-2">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-cyan-200/15 bg-[#0b2241]/85 p-5 shadow-lg"
              >
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 bg-cyan-300/10 blur-2xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-100">
                  <Sparkles className="h-3 w-3" /> Battle UI Overlay
                </div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-200/70">{project.tag}</div>
                <h3 className="mt-2 text-xl font-bold italic">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-200">{project.description}</p>
                {project.href && (
                  <a href={project.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold text-cyan-200 hover:underline">
                    <GitHubMark className="h-4 w-4" /> View {project.title} on GitHub
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="mt-10 grid gap-8 scroll-mt-24 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-cyan-300/20 bg-white/5 p-6 md:p-8"
          >
            <SectionHeader
              eyebrow="Skill Matrix"
              title="CORE SKILLS"
              subtitle="Selected technical skills and domains pulled from the resume and grouped for a cleaner portfolio view."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {skillGroups.map((group, idx) => {
                const Icon = group.icon;
                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-[#091c34]/80 p-5"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <Icon className="h-5 w-5 text-cyan-300" />
                      <div className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">{group.title}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-cyan-300/20 bg-[#0a1e38] px-3 py-1.5 text-xs font-semibold text-cyan-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#53b2ff] p-6 text-[#031325] shadow-2xl scroll-mt-24 md:p-8"
          >
            <motion.div
              animate={{ x: [0, 16, 0], opacity: [0.18, 0.28, 0.18] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/40 blur-3xl"
            />

            <div className="relative z-10">
              <SectionHeader
                eyebrow="Contact"
                title="LET'S BUILD SOMETHING SECURE."
                subtitle="Looking for someone who can combine security thinking with practical software engineering and hands-on implementation? Let’s connect."
              />
              <div className="space-y-4 text-sm font-semibold md:text-base">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" /> {profile.location}
                </div>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                  <LinkedInMark className="h-5 w-5" /> linkedin.com/in/kabirdubey
                </a>
                <a href="https://github.com/kabeeraaa" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                  <GitHubMark className="h-5 w-5" /> github.com/kabeeraaa
                </a>
              </div>
</div>
</motion.div>
</section>

<footer className="mt-10 pb-4 text-center text-xs uppercase tracking-[0.25em] text-cyan-100/55">
  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
    <Database className="h-3.5 w-3.5" /> Persona-styled portfolio system // Kabir Dubey
  </div>
</footer>
</main>
</div>
);
}
