import About from "./components/sections/About";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import SiteHeader from "./components/SiteHeader";
import { getPortfolioContent } from "../lib/portfolio-content";
import { isContentStoreConfigured } from "../lib/supabase/service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  try {
    const content = await getPortfolioContent();
    return {
      title: content?.settings?.metaTitle ?? "Portfolio",
      description: content?.settings?.metaDescription ?? "Developer portfolio",
    };
  } catch {
    return { title: "Portfolio", description: "Developer portfolio" };
  }
}

function PortfolioUnavailable() {
  return (
    <main className="site-shell">
      <section className="portfolio-unavailable">
        <div>
          <p className="section-kicker">CONTENT NOT INITIALIZED</p>
          <h1>Portfolio content is being configured.</h1>
          <p>
            The portfolio is being connected to its live content database.
            Please check back soon.
          </p>
        </div>
      </section>
    </main>
  );
}

export default async function HomePage() {
  if (!isContentStoreConfigured()) return <PortfolioUnavailable />;

  let content = null;
  try {
    content = await getPortfolioContent();
  } catch (error) {
    console.error("Portfolio content could not be loaded:", error.message);
  }

  if (!content) return <PortfolioUnavailable />;

  return (
    <main className="site-shell">
      <SiteHeader navLinks={content.navigation} settings={content.settings} ui={content.ui} />
      <Hero content={content.hero} ui={content.ui} />
      <About content={content.about} settings={content.settings} />
      <Experience content={content.experience} />
      <Certifications content={content.certifications} ui={content.ui} />
      <Skills content={content.skills} />
      <Projects content={content.projects} ui={content.ui} />
      <Contact content={content.contact} settings={content.settings} ui={content.ui} />
      <Footer content={content.footer} settings={content.settings} links={content.socialLinks} />
    </main>
  );
}
