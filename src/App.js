import React from "react";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import Testimonials from "./Components/Testimonial";
import Footer from "./Components/Footer";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import CaseStudies from "./Components/CaseStudies";
import Consulting from "./Components/Consulting";
import "./App.css";

export default function App() {
  const [theme, setTheme] = React.useState(() => {
    try { return window.localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark"; }
    catch { return "dark"; }
  });

  React.useEffect(() => {
    try { window.localStorage.setItem("portfolio-theme", theme); } catch {}
  }, [theme]);

  React.useEffect(() => {
    const shell = document.querySelector(".site-shell");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!shell || reduceMotion || !("IntersectionObserver" in window)) return undefined;

    const elements = document.querySelectorAll(
      "main > section, .role-card, .case-study-card, .project-card, .skill-group, .education-card, .publication, .cert-card, .consulting-card, .meeting-form"
    );
    shell.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    elements.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell" data-theme={theme}>
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      <main>
        <About />
        <Experience />
        <CaseStudies />
        <Projects />
        <Skills />
        <Education />
        <Testimonials />
        <Consulting />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
