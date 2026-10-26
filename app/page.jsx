import About from "./components/sections/About";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import SiteHeader from "./components/SiteHeader";

export default function HomePage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <Hero />
      <About />
      <Experience />
      <Certifications />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
