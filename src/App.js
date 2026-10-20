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
  return (
    <div className="site-shell">
      <Navbar />
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
