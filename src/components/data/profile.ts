type ProfileHighlight = {
  topic: "security" | "development" | "roles";
  text: string;
};

type Profile = {
  name: string;
  title: string;
  summary: string;
  shortBio: string;
  discipline: string;
  roleLabel: string;
  status: string;
  highlights: readonly ProfileHighlight[];
};

type Contact = {
  location: string;
  linkedin: { href: string; label: string };
  github: { href: string; label: string };
};

export const profile: Profile = {
  name: "Kabir Dubey",
  title: "M.Sc. Cybersecurity Graduate | Security + Software Builder",
  summary:
    "M.Sc. Cybersecurity graduate with hands-on experience in network defense, cryptography, threat analysis, and secure software development. I build practical systems that blend defensive security thinking with real engineering execution, from post-quantum secure communication to full-stack and machine learning projects.",
  shortBio: "Cybersecurity graduate focused on secure systems, detection, and practical engineering.",
  discipline: "Cybersecurity",
  roleLabel: "Security + Software",
  status: "Open to Opportunities",
  highlights: [
    {
      topic: "security",
      text: "Threat-focused mindset with practical experience in network defense, cryptography, vulnerability assessment, and security analysis.",
    },
    {
      topic: "development",
      text: "Hands-on builder across software, security tooling, full-stack development, research prototypes, and cloud-connected apps.",
    },
    {
      topic: "roles",
      text: "Actively pursuing roles where security engineering, cybersecurity operations, and software development intersect.",
    },
  ],
};

const linkedin = "linkedin.com/in/kabirdubey";
const github = "github.com/kabeeraaa";

export const contact: Contact = {
  location: "Vancouver, BC",
  linkedin: { href: `https://${linkedin}`, label: linkedin },
  github: { href: `https://${github}`, label: github },
};
