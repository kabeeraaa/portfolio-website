export type ProjectItem = {
  title: string;
  tag: string;
  description: string;
  tech: readonly string[];
  repositoryUrl?: string;
};

export const projects: readonly ProjectItem[] = [
  {
    title: "COVID Detection Flask App",
    tag: "Machine Learning / Web App",
    description:
      "Built a medical image classification solution using CNN architectures including GoogLeNet, ResNet50, and VGG16, reaching up to 85% accuracy on X-ray and CT scan data. Wrapped the model in a Flask web application that enabled real-time prediction from uploaded images, turning the project into a more accessible AI-driven diagnostic demo.",
    tech: ["Python", "Flask", "TensorFlow", "CNN", "GoogLeNet", "ResNet50", "VGG16"],
  },
  {
    title: "Optical Character Recognition Android App",
    tag: "Mobile / Cloud Integration",
    description:
      "Developed an Android OCR application that integrated Google Cloud Vision API for character and object recognition and used Firebase for real-time text storage. The project emphasized usability and structured output by returning JSON-based results for smoother downstream handling and analysis.",
    tech: ["Android", "Firebase", "Google Cloud Vision", "JSON"],
  },
  {
    title: "Bake My Cake",
    tag: "Angular / Frontend Development",
    description:
      "Created a single-page Angular bakery catalog with JSON Server for cakes, cookies, and brownies. Added search, category filters, and a validated order request form. A client-side route guard controls navigation to the demo order list.",
    tech: ["Angular", "TypeScript", "Angular Material", "JSON Server", "Client-side Route Guards"],
    repositoryUrl: "https://github.com/kabeeraaa/bake-my-cake",
  },
  {
    title: "Kanban Board",
    tag: "Full-Stack Development",
    description:
      "Built a Kanban application with an Angular and TypeScript frontend and Java/Spring Boot services. REST APIs manage boards, tasks, and team members and persist task status changes after a drag-and-drop action. MongoDB stores board and task data, MySQL supports authentication, and RabbitMQ carries notifications.",
    tech: ["Angular", "TypeScript", "Java/Spring Boot", "MongoDB", "MySQL", "RabbitMQ"],
    repositoryUrl: "https://github.com/kabeeraaa/kanban-board",
  },
  {
    title: "Jummpy Bunny",
    tag: "Game Development",
    description:
      "A Unity 2D endless runner with physics-based movement, procedural level blocks, and persistent high scores.",
    tech: ["Unity", "C#"],
    repositoryUrl: "https://github.com/kabeeraaa/jummpybunny",
  },
];
