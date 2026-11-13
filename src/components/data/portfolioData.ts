// src/data/portfolioData.ts

export const profile = {
  name: "Kabir Dubey",
  title: "M.Sc. Cybersecurity Graduate | Security + Software Builder",
  location: "Vancouver, BC",
  linkedin: "https://linkedin.com/in/kabirdubey",
  summary:
    "M.Sc. Cybersecurity graduate with hands-on experience in network defense, cryptography, threat analysis, and secure software development.",
};

export const menuItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kabirdubey",
    href: "https://linkedin.com/in/kabirdubey",
  },
  {
    label: "GitHub",
    value: "github.com/kabeeraaa",
    href: "https://github.com/kabeeraaa",
  },
];

export type PortfolioProject = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  href?: string;
};

export const projects: PortfolioProject[] = [
  {
    title: "Kanban Board",
    tag: "Full-Stack Development",
    description:
      "NIIT capstone with an Angular frontend and a Java/Spring Boot backend. REST APIs manage boards, tasks, and team members, and save task status changes made by dragging cards between columns.",
    tech: ["Angular", "Java", "Spring Boot", "MongoDB"],
    href: "https://github.com/kabeeraaa/kanban-board",
  },
  {
    title: "Bake My Cake",
    tag: "Frontend Development",
    description:
      "Angular bakery catalog with client-side search, category filters, and a validated order request form. The local demo uses JSON Server and a client-side route guard for the order list.",
    tech: ["Angular", "TypeScript", "Angular Material", "JSON Server"],
    href: "https://github.com/kabeeraaa/bake-my-cake",
  },
  {
    title: "Jummpy Bunny",
    tag: "Game Development",
    description:
      "A Unity 2D endless runner with physics-based movement, procedural level blocks, and persistent high scores.",
    tech: ["Unity", "C#"],
    href: "https://github.com/kabeeraaa/jummpybunny",
  },
  {
    title: "OCR Android App",
    tag: "Mobile Development",
    description: "Android project focused on extracting text from images.",
    tech: ["Android", "OCR"],
  },
  {
    title: "COVID Detection Flask App",
    tag: "Forked Machine Learning Project",
    description:
      "Forked a Python and Flask project that demonstrates image classification on uploaded chest X-rays and CT scans.",
    tech: ["Python", "Flask"],
  },
];
