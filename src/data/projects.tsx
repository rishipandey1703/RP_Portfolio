export const projects: Project[] = [
  {
    id: "rp-portfolio",
    category: "Personal Developer Portfolio",
    title: "RP Portfolio",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [],
    },
    live: "#",
    github: "https://github.com/rishipandey1703/RP_Portfolio",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Modern Developer Portfolio
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Modern developer portfolio built using Next.js, TypeScript,
            React and Tailwind CSS to showcase projects, technical skills
            and professional experience.
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Developed a responsive and modern user interface with smooth
            animations and interactive components using Framer Motion.
            Includes dedicated sections for projects, technical skills,
            experience, achievements and contact information.
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Deployed as a production-ready application on Vercel with
            GitHub-based continuous deployment.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },

  {
    id: "resume-builder",
    category: "Full Stack Web Application",
    title: "Resume Builder",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
      ],
    },
    live: "#",
    github: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Full-Stack Resume Generation Platform
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Developed a full-stack resume generation platform with
            customizable templates, dynamic editing and real-time preview
            functionality.
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Built dynamic forms for creating and managing structured resume
            information across multiple sections using React.js, Node.js,
            Express.js and MongoDB.
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Implemented customizable resume templates with real-time preview
            and responsive interfaces to help users efficiently create
            professional resumes.
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Deployed the application using a production-ready workflow for
            accessible online resume creation.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },

  {
    id: "ai-code-debugger",
    category: "AI / Agentic Application",
    title: "AI Powered Autonomous Code Debugger",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
      ],
      backend: [
        PROJECT_SKILLS.python,
      ],
    },
    live: "#",
    github: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI-Powered Autonomous Software Debugging System
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Built an AI-powered autonomous debugger that scans software
            repositories, diagnoses faults using static analysis and runtime
            traces, and generates candidate fixes using LLM reasoning.
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Developed using React, Vite, Flask, Python AST, xAI Grok API and
            GitPython, combining static analysis, runtime execution and
            AI-assisted debugging.
          </TypographyP>

          <TypographyP className="font-mono mt-4">
            Automated a Scan-Reason-Fix-Test pipeline with GitHub integration,
            enabling developers to review and approve generated fixes through
            automatically created Pull Requests.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
];
