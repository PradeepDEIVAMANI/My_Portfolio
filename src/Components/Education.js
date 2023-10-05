import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function Education() {
  return (
    <section id="education" className="bg-gray-900 text-gray-400 py-10">
         <div className="container px-5 py-10 mx-auto text-center lg:px-40">
      <div className="container mx-auto">
      <FontAwesomeIcon icon={faGraduationCap} className="text-orange-600 text-3xl " />
      </div>
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
          
          Education
          
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-350 pb-10"> My bachelor's program provided me with a strong foundation in technology and engineering, with a focus on computer science and software development. It prepared me for a career in the dynamic field of technology.</p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Education Item 1 */}
          <div className="bg-gray-800 p-20 rounded-md w-full max-h-full md:w-1/2">
            <h2 className="text-xl font-semibold text-white">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-3  text-orange-600" />Masters in Software Engineering and Digital transformation
            </h2>
            <p className="text-gray-300 pb-4">ESIGELEC-École supérieure d'ingénieurs en génie électrique</p>
            <p className="text-gray-300">Graduation Year: 2022-Present</p>
          </div>

          {/* Education Item 2 */}
          <div className="bg-gray-800 p-20 h-full rounded-md w-full max-h-full md:w-1/2">
            <h2 className="text-xl font-semibold text-white">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-orange-600" />Becholers of Technologies in Mechanical engineering
            </h2>
            <p className="text-gray-300 pb-4">SMVEC-Sri Manakula Vinayagar Engineering College</p>
            <p className="text-gray-300">Graduation Year: 2017-2021</p>
          </div>

          {/* Add more education items as needed */}
        </div>
      </div>
    </section>
  );
}
