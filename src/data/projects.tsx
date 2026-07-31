import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { SiThreedotjs, SiCplusplus, SiPython, SiDocker, SiPostgresql, SiMongodb } from "react-icons/si";
import { FaAws } from "react-icons/fa";

const BASE_PATH = "/assets/projects-screenshots";

const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

export const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: { title: "Python", bg: "black", fg: "white", icon: <SiPython /> },
  postgres: { title: "PostgreSQL", bg: "black", fg: "white", icon: <SiPostgresql /> },
  mongo: { title: "MongoDB", bg: "black", fg: "white", icon: <SiMongodb /> },
  express: brand("Express", "express-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: { title: "Docker", bg: "black", fg: "white", icon: <SiDocker /> },
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  cpp: { title: "C++", bg: "black", fg: "white", icon: <SiCplusplus /> },
  aws: { title: "AWS", bg: "black", fg: "white", icon: <FaAws /> },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

export const projects: Project[] = [
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
    github: "https://github.com/rishipandey1703",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Professional Resume Generation Platform
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Developed a full-stack Resume Builder that enables users to create professional resumes through dynamic forms with real-time preview.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Built using the MERN stack with customizable templates, responsive UI and efficient resume management.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "smart-safar",
    category: "AI Travel Platform",
    title: "Smart Safar",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.python,
      ],
    },
    live: "#",
    github: "https://github.com/rishipandey1703",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI-Powered Sustainable Travel Recommendation Platform
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Recommends destinations using weather, AQI, crowd density and travel preferences.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Integrated multiple APIs to provide real-time travel insights and promote sustainable tourism.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "ai-chatbot",
    category: "Full Stack Application",
    title: "AI ChatBot",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.js,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
      ],
    },
    live: "#",
    github: "https://github.com/rishipandey1703",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            MERN Stack AI Chat Application
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Developed a responsive chatbot with REST APIs, MongoDB integration and real-time interaction.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Focused on responsive design, efficient backend communication and seamless user experience.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "rp-portfolio",
    category: "Portfolio Website",
    title: "RP Portfolio",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
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
            Personal Developer Portfolio
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Built using Next.js, TypeScript, React and Tailwind CSS to showcase projects, skills and experience.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Features responsive layouts, smooth animations and a modern UI for recruiters and collaborators.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
];

export default projects;