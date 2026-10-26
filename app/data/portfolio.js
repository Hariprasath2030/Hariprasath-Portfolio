import medivox from "../../src/assets/medivox.png";
import smartRetail from "../../src/assets/smart-retail.png";
import budgetBloom from "../../src/assets/budgetbloom.png";
import restaurant from "../../src/assets/carrent.png";
import gradeCraft from "../../src/assets/jobit.png";
import festBook from "../../src/assets/fest-book.png";
import healthcare from "../../src/assets/healthcare.png";
import portrait from "../../src/assets/port.jpg";

export const profile = {
  name: "Hariprasath V",
  email: "officialhari2030@gmail.com",
  phone: "+91 8925425514",
  location: "Tirupattur, Tamil Nadu, India",
  resume: "/HARIPRASATH_R.pdf",
  portrait,
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const experience = [
  {
    role: "Frontend Developer Intern",
    company: "Sekel Tech",
    date: "June 2025 – Present",
    points: [
      "Working as a Frontend Developer in a hyperlocal omni-channel platform using Next.js and API integration.",
      "Building responsive, scalable UIs with smooth animations and enhanced user experiences.",
      "Collaborating with cross-functional teams to deliver fast, interactive, and modern web solutions.",
    ],
  },
  {
    role: "Web Developer & Backend Developer",
    company: "Cognifyz Technologies",
    date: "April 2024 – June 2024",
    points: [
      "Worked on dynamic website development using HTML, CSS, JavaScript, and PHP.",
      "Developed backend services and RESTful APIs using PHP and XAMPP for smooth frontend integration.",
      "Focused on responsive design, performance optimization, and application security across devices.",
      "Performed unit testing, debugging, and code reviews to maintain high-quality code standards.",
    ],
  },
];

export const certifications = [
  {
    title: "Getting Started with Spring Boot 2.0",
    issuer: "Infosys Springboard",
    date: "October 2024 – December 2024",
    description:
      "Comprehensive certification covering enterprise-level Spring Boot application development, RESTful API design, Spring Security implementation, and microservices architecture.",
    file: "Spring.pdf",
  },
  {
    title: "Advanced MERN Stack Development",
    issuer: "Infosys Springboard",
    date: "September 2024 – October 2024",
    description:
      "Full-stack web development certification focusing on MongoDB, Express.js, React.js, and Node.js ecosystem with modern development practices and deployment strategies.",
    file: "Mern.pdf",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Cognifyz Technologies",
    date: "April 2024 – June 2024",
    description:
      "Comprehensive web development certification covering both frontend and backend technologies with hands-on project experience and industry best practices.",
    file: "Cognify.pdf",
  },
  {
    title: "Introduction to DevOps",
    issuer: "Great Learning Academy",
    date: "November 2024",
    description:
      "Completed an introductory course on DevOps covering core concepts, tools, and practices essential for continuous integration, deployment, and automation in modern software development.",
    file: "Devops.pdf",
  },
];

export const technologies = [
  "HTML 5",
  "CSS 3",
  "JavaScript",
  "React JS",
  "Tailwind CSS",
  "Node JS",
  "MongoDB",
  "Three JS",
  "Spring Boot",
  "Angular Js",
  "PHP",
  "Bootstrap",
  "Java",
];

export const projects = [
  {
    name: "Medi-Vox – AI Medical Voice Assistant",
    description:
      "A real-time AI medical voice agent that lets users speak naturally about health symptoms and receive instant, intelligent, context-aware medical guidance. Powered by AssemblyAI for STT/TTS, secured with Clerk authentication, and backed by Neon PostgreSQL with encrypted medical records.",
    tags: ["Nextjs", "Reactjs", "Typescript", "AssemblyAI", "ClerkAuth"],
    image: medivox,
    source: "https://github.com/Hariprasath2030/Medi-Vox",
    demo: "https://medi-vox.vercel.app/",
  },
  {
    name: "Smart Retail Hub",
    description:
      "An integrated system designed to optimize inventory management through automation and real-time monitoring. It combines automated checkout, sales tracking, and customer engagement for product tracking, predictive analytics, supply chain visibility, and better decision-making.",
    tags: ["Reactjs", "Tailwindcss", "Nodejs", "Expressjs", "Mongodb"],
    image: smartRetail,
    source: "https://github.com/Hariprasath2030/Retail-Hub-client",
    demo: "https://retail-hub-client.vercel.app/",
  },
  {
    name: "Budget Bloom",
    description:
      "A full-stack app for managing finances by tracking income and expenses and analyzing spending with visual charts. It includes authentication, filters, financial insights, expense categorization, savings optimization, monthly reports, goal tracking, cash-flow analysis, and secure data storage.",
    tags: ["Nextjs", "Tailwindcss", "Drizzle Orm", "Expressjs", "Neon", "Clerk"],
    image: budgetBloom,
    source: "https://github.com/Hariprasath2030/Budget-Bloom",
    demo: "https://budget-bloom.vercel.app/",
  },
  {
    name: "Restaurant management system",
    description:
      "A web-based management system designed to improve communication between clients and restaurant owners, including table reservations for dining.",
    tags: ["Html", "Css", "Javascript"],
    image: restaurant,
    source: "https://github.com/Hariprasath2030/Restaurant-management-system",
    demo: "https://restaurant-management-system-vjyw.vercel.app/",
  },
  {
    name: "GRADE CRAFT",
    description:
      "A platform for educators and administrative staff addressing incident analysis and proactive safety management in educational institutions, with an emphasis on the complexities of aviation safety.",
    tags: ["Html", "Css", "Javascript", "PHP", "SQL"],
    image: gradeCraft,
    source: "https://github.com/Hariprasath2030/Student-performance-system",
  },
  {
    name: "Fest-Book",
    description:
      "An event management platform that connects organizers and customers, enabling event creation, promotion, and booking through a dynamic interface for interaction and communication.",
    tags: ["Nextjs", "Tailwindcss", "Nodejs", "Expressjs", "Cluster", "Clerk"],
    image: festBook,
    source: "https://github.com/Hariprasath2030/Fest-Event-App-Frontend",
    demo: "https://fest-book.vercel.app/",
  },
  {
    name: "AI-Smart HealthCare",
    description:
      "A virtual doctor platform using AI to provide accessible healthcare remotely, especially in underserved areas. Built with React.js, Tailwind CSS, Clerk, and MongoDB to help bridge gaps in healthcare access.",
    tags: ["Reactjs", "Tailwindcss", "Nodejs", "Expressjs", "Cluster"],
    image: healthcare,
    source: "https://github.com/Hariprasath2030/Heal_Smart_System",
    demo: "https://heal-smart-system.vercel.app/",
  },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hariprasath-v-ab5006276",
  },
  { label: "GitHub", href: "https://github.com/Hariprasath2030" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hearty_soul_016?igsh=MTNoNWFjdXp0MzN6Ng==",
  },
  {
    label: "Twitter",
    href: "https://x.com/Hariprasat67463?t=pBW9m_AzJkdc5RXmVmPbiw&s=09",
  },
  { label: "LeetCode", href: "https://leetcode.com/u/hariprasath2030/" },
];
