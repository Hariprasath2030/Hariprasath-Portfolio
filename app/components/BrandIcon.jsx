import { Code2 } from "lucide-react";
import { FaJava, FaLinkedinIn } from "react-icons/fa6";
import {
  SiAngular,
  SiClerk,
  SiBootstrap,
  SiCss,
  SiDrizzle,
  SiExpress,
  SiGithub,
  SiHtml5,
  SiInstagram,
  SiJavascript,
  SiLeetcode,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNeon,
  SiNextdotjs,
  SiPhp,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiX,
} from "react-icons/si";

const icons = {
  angular: SiAngular,
  angularjs: SiAngular,
  bootstrap: SiBootstrap,
  clerk: SiClerk,
  css: SiCss,
  css3: SiCss,
  drizzle: SiDrizzle,
  express: SiExpress,
  expressjs: SiExpress,
  github: SiGithub,
  html: SiHtml5,
  html5: SiHtml5,
  instagram: SiInstagram,
  java: FaJava,
  javascript: SiJavascript,
  js: SiJavascript,
  leetcode: SiLeetcode,
  linkedin: FaLinkedinIn,
  mongodb: SiMongodb,
  mysql: SiMysql,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  neon: SiNeon,
  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  php: SiPhp,
  react: SiReact,
  reactjs: SiReact,
  springboot: SiSpringboot,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  threejs: SiThreedotjs,
  typescript: SiTypescript,
  twitter: SiX,
  x: SiX,
};

export default function BrandIcon({ name, className }) {
  const key = String(name ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const Icon = icons[key] ?? Code2;

  return <Icon className={className} aria-hidden="true" focusable="false" />;
}
