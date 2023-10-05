import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";


export default function Navbar() {
    return (
        <header className="bg-gradient-to-r from-orange-600 via-black-400 md:sticky top-0 z-10">
        <div className="container mx-auto flex flex-wrap p-6 px-20 flex-col md:flex-row items-center">
          <a className="title-font font-medium text-white mb-4 md:mb-0">
            <a href="#about" className="ml-3 text-xl font-bold font-serif">
              Pradeep DEIVAMANI
            </a>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center text-white">
            <a href="#projects" className="mr-5 hover:text-orange-400">
              Projects
            </a>
            <a href="#skills" className="mr-5 hover:text-orange-400">
              Skills
            </a>
            <a href="#testimonials" className="mr-5 hover:text-orange-400">
              Certifications
            </a>
            <a href="#Footer" className="mr-5 hover:text-orange-400">
              Find Me Here
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center bg-orange-600  border-0 py-1 px-3 focus:outline-none hover:bg-orange-700 rounded text-white mt-4 md:mt-0"
          >
            Hire Me
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </a>
        </div>
      </header>
    );
  }
  
