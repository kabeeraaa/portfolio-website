type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: readonly string[];
};

export const experience: readonly ExperienceItem[] = [
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
