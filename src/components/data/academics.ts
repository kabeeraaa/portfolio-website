type EducationItem = {
  degree: string;
  school: string;
  location: string;
  period: string;
  highlight: string;
};

type ResearchItem = {
  title: string;
  description: string;
  details: string;
};

export const education: readonly EducationItem[] = [
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

export const certifications: readonly string[] = [
  "Software Engineer Program – NIIT",
  "Google Cloud Ready Program",
  "Introduction to Cybersecurity – Cisco Networking Academy",
];

export const researchWork: readonly ResearchItem[] = [
  {
    title: "Adaptive Micro-Segmentation (Zero Trust)",
    description:
      "Designed a dynamic micro-segmentation model to detect and restrict lateral movement in network environments.",
    details:
      "Built a policy-driven system simulating Zero Trust segmentation. Evaluated detection rate, false positives, and policy precision to model real-world APT containment strategies.",
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
    title: "TCP/IP Exploitation & Network Attacks",
    description: "Worked on real-world network attack simulations and mitigation.",
    details:
      "Explored SYN flood mitigation, session hijacking, TCP reset attacks, reverse shells, and reconnaissance using Nmap and NSE scripting.",
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
