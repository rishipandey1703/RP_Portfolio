// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  REACT = "react",
  NEXTJS = "nextjs",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  TAILWIND = "tailwind",
  GIT = "git",
  GITHUB = "github",
  DOCKER = "docker",
  AWS = "aws",
  CPP = "cpp",
  PYTHON = "python",
  HTML = "html",
  CSS = "css",
  MYSQL = "mysql",
  
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.CPP]: {
    id: 1,
    name: "cpp",
    label: "C++",
    shortDescription: "Pointer gymnastics and memory magic! 🧠🚀",
    color: "#00599C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  [SkillNames.PYTHON]: {
    id: 2,
    name: "python",
    label: "Python",
    shortDescription: "Indentation is my religion. 🐍🚀",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.JS]: {
    id: 3,
    name: "js",
    label: "JavaScript",
    shortDescription: "Causing undefined behaviors since '95! 💯🚀",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.TS]: {
    id: 4,
    name: "ts",
    label: "TypeScript",
    shortDescription: "Making sure JavaScript plays by the rules. 💯🔒",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription: "State management? More like state of panic. ⚛️",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 6,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "Server-side rendering everything because why not? 👑📜",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 7,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "Taking JavaScript to the server, against all odds! 🔙🔚",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 8,
    name: "express",
    label: "Express",
    shortDescription: "Routing requests like a traffic cop! 🚂💨",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 9,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Relational data with a touch of class. 💅🐘",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 10,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "Documents over tables, any day! 💪🍃",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 11,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "Styling at the speed of thought. 🌪️🔥",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  [SkillNames.GIT]: {
    id: 12,
    name: "git",
    label: "Git",
    shortDescription: "Time travel for code! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 13,
    name: "github",
    label: "GitHub",
    shortDescription: "Where code goes to be judged. 🐙",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 14,
    name: "docker",
    label: "Docker",
    shortDescription: 'Shipping "it works on my machine" everywhere! 🐳🔥',
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.AWS]: {
    id: 15,
    name: "aws",
    label: "AWS",
    shortDescription: "Cloud bills go brrrrrr! 🌐👨‍💻",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
  },
  
  [SkillNames.HTML]: {
    id: 17,
    name: "html",
    label: "HTML5",
    shortDescription: "The undisputed king of markup! 🦴",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 18,
    name: "css",
    label: "CSS3",
    shortDescription: "Making divs center since forever. ✨",
    color: "#264de4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.MYSQL]: {
    id: 19,
    name: "mysql",
    label: "MySQL",
    shortDescription: "Structured data, structured life. 🐬",
    color: "#00758f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  
  
 
  
  
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Dec 2024",
    endDate: "Oct 2025",
    title: "AI Trainer",
    company: "Outlier AI",
    description: [
      "Evaluated Large Language Models (LLMs) across multiple AI evaluation projects by identifying reasoning, factual and instruction-following issues.",
      "Designed prompts, reviewed AI-generated responses and documented model failure cases to improve model quality and reliability.",
      "Worked remotely with Python-based AI evaluation workflows while maintaining project quality and guideline compliance."
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.JS,
    ],
  },
  {
    id: 2,
    startDate: "Aug 2023",
    endDate: "Jun 2027",
    title: "Bachelor of Technology (Computer Science & Engineering - AI & ML)",
    company: "ABES Engineering College, Ghaziabad",
    description: [
      "Pursuing B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning).",
      "Affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU).",
      "Current CGPA: 7.6.",
      "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Artificial Intelligence and Machine Learning."
    ],
    skills: [
      SkillNames.CPP,
      SkillNames.PYTHON,
      SkillNames.JS,
      SkillNames.REACT,
      SkillNames.NODEJS,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Incoming flashbang! Light mode is firing up a million pixels of pure sunshine.",
    "Hold on tight! Switching to light mode. Retinal protection advised.",
    "Do not attempt without proper eye gear. This level of brightness is no joke!",
    "Get ready! We're cranking up the lumens to outshine the sun.",
    "Initiating light mode... I hope you're prepared for the glare!",
  ],
  dark: [
    "Escaping the glare, I see? Welcome back to the comforting darkness.",
    "Going dark... How did you survive that blinding brightness?",
    "Shadows activated! A collective sigh of relief from all the pixels.",
    "Returning to the dark realm. The light was getting a bit much anyway.",
    "Dark mode engaged! Only people of culture prefer this aesthetic.",
  ],
};

