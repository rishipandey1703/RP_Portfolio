const config = {
  title: "Rishi Pandey | AI & ML Student | Full Stack Developer",

  description: {
    long: "Explore the portfolio of Rishi Pandey, a fourth-year B.Tech CSE (AI & ML) student passionate about Full Stack Development, Artificial Intelligence, Machine Learning, and building scalable web applications. Discover my projects, technical skills, and achievements.",

    short:
      "Portfolio of Rishi Pandey - AI & ML Student, Full Stack Developer, and Problem Solver.",
  },

  keywords: [
    "Rishi Pandey",
    "Portfolio",
    "AI & ML",
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "C++",
    "JavaScript"
  ],

  author: "Rishi Pandey",

  email: "pandeyrishi275@gmail.com",

  site: "https://rp-portfolio-chi.vercel.app/",

  githubUsername: "rishipandey1703",

  githubRepo: "RP_Portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },

  social: {
    leetcode: "https://leetcode.com/u/rishi_pandey17/",

    linkedin: "https://www.linkedin.com/in/rishi-pandey-stu/",

    instagram: "https://instagram.com/i.m.rishi45",

    facebook: "",

    github: "https://github.com/rishipandey1703",
  },

  resumeLink: "https://drive.google.com/file/d/1HzUg1sNx9dnocxaF_6CoHVRVOe359BKB/view?usp=drivesdk",
};

export { config };
