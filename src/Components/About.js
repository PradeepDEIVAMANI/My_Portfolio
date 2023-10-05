import React from "react";


export default function About() {
    return (
      <section id="about">
        <div className="container mx-auto flex px-24 py-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Hi, I'm Pradeep DEIVAMANI.
              <br className="hidden lg:inline-block" />I love to build amazing <span className="text-orange-700 font-semibold"> Full stack</span> Web application.
            </h1>
            <p className="mb-8 leading-relaxed text-gray-200  p-4 rounded text-justify">
                Full stack developers are highly valuable in the tech industry, as they possess a wide range of skills and can work on both the front-end and back-end of web applications. If you have any specific questions, need advice, or want to discuss anything related to full stack development or your career, feel free to ask. I'm here to help!
            </p>
            <div className="flex justify-center">
              <a
                href="#contact"
                className="inline-flex text-white  border border-orange-700 py-2 px-6 focus:outline-none hover:bg-orange-700 rounded text-lg">
                Work With Me
              </a>
              <a
                href="#projects"
                className="ml-4 inline-flex text-white bg-orange-600 border-0 py-2 px-6 focus:outline-none hover:bg-orange-700 rounded text-lg">
                See My Projects
              </a>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded-lg border-4 border-gradient-10 shadow-lg transform scale-100 hover:scale-105 opacity-100 hover:opacity-75 transition duration-300 ease-in-out"
              alt="hero"
              src="./edited.jpg"
            />
          </div>
        </div>
      </section>
    );
  }
  
  
  
  
  
  
