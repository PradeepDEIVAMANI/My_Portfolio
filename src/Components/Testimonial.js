import React from "react";
import { TerminalIcon, CheckCircleIcon} from "@heroicons/react/solid";
import { testimonials } from "../data";


export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container px-5 py-10 mx-auto text-center text-white">
        <CheckCircleIcon className="w-10 inline-block mb-4 text-orange-700" />
        <h1 className="sm:text-4xl text-3xl font-medium title-font  mb-12">
          Certifications
        </h1>
        
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base  pb-10 text-gray-400">I'm a Certified Full-Stack Developer with expertise in both front-end and back-end development, enabling me to create dynamic web applications."</p>
        
        <div className="flex flex-wrap m-4">
          {testimonials.map((testimonial) => (
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                <TerminalIcon className="block w-8 text-orange-600 mb-4" />
                <p className="leading-relaxed mb-6 text-xl font-bold">{testimonial.title}</p>
                <p className="leading-relaxed mb-6">{testimonial.description}</p>
                <div className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src={testimonial.image}
                    className="w-8 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-white">
                      {testimonial.name}
                    </span>
                    <span className="text-orange-500 text-sm">
                     <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-orange-700">
                      {testimonial.link}
                     </a>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
