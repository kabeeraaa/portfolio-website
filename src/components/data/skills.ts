type SkillCategory = "Programming" | "Security" | "Development" | "Domains";

type SkillGroup = {
  title: SkillCategory;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Programming",
    items: ["Java", "C/C++", "JavaScript", "TypeScript", "Swift", "PowerShell", "MySQL", "HTML5", "CSS3"],
  },
  {
    title: "Security",
    items: ["Wireshark", "Nmap", "Scapy", "Snort", "Suricata", "Autopsy", "Cellebrite", "OWASP", "CVE", "CVSS"],
  },
  {
    title: "Development",
    items: ["React", "Angular", "Firebase", "TensorFlow", "JUnit", "Android Studio", "Jupyter", "Linux"],
  },
  {
    title: "Domains",
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
