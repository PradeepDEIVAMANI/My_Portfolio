import React from "react";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import Testimonials from "./Components/Testimonial";
import Footer from"./Components/Footer";
import Education from"./Components/Education";


export default function App() {
  return (
  
    <main className="  bg-gray-900 to-black">
     
     <Navbar />
      <About />
      <Education/>
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
  </main>
  );
  
}