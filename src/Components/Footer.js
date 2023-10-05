import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <section id="Footer">
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
          <a
              href="https://www.linkedin.com/in/pradeep-deivamani-86a01417b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-800 text-orange-600"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="https://github.com/PradeepDEIVAMANI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-800 text-orange-600"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://www.instagram.com/mr._.pradeep._.31/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-800 text-orange-600"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          
            {/* Add more social icons as needed */}
          </div>

          {/* Download CV Button */}
          <a
            href="https://drive.google.com/file/d/1rcEFqvYm6_AxPIboSEhJBgjcqzYXkeN9/view"
            download="Pradeep-Resume.pdf"
            className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out ml-4"
          >
            Download CV
          </a>

          {/* Additional Message */}
          <div className="text-sm text-center mt-4 pr-2">
            <p className="text-lg text-orange-400 font-semibold mx-auto">
              || Debug with patience, code with passion ||
            </p>
            <p>&copy; {`${new Date().getFullYear()} Pradeep DEIVAMANI. All Rights Reserved.`}</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
