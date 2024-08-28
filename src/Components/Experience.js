import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'

export default function Experience() {
  return (
    <section id="experience" className="bg-gray-900 text-gray-400 py-10">
         <div className="container px-5 py-10 mx-auto text-center lg:px-100">
      <div className="container mx-auto">
      <FontAwesomeIcon icon={faUserTie} className="text-orange-600 text-3xl " />
      </div>
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
          
          Professional Experience
          
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-350 pb-10"> Seasoned Software Engineer with expertise in Agile methodologies tailored for BCEF workflows. Adept in Java Spring Boot microservices, Spring Batch, and test-driven development (TDD) and behavior-driven development (BDD). Proficient, CI/CD pipelines (Jenkins, GitLab, sonarQube, ArgoCD), Kubernetes, Docker, and Infrastructure as Code (IaC) using Terraform and Ansible. Experienced with databases like SQl and PostgreSQL, as well as messaging systems such as Kafka, IBM MQ, and ActiveMQ. Demonstrates ultimate proficiency in DevOps practices.</p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Education Item 1 */}
          <div className="bg-gray-800 p-20 rounded-md w-full max-h-full md:w-1/2">
            <h2 className="text-xl font-semibold text-white">
              <FontAwesomeIcon icon={faUserTie} className="mr-3  text-orange-600" />Software Engineer - Java Developer
            </h2>
            <p className="text-gray-300 pb-4">BNP Paribas-BCEF IT</p>
            <p className="text-gray-300"> Year: 2024-Present</p>
          </div>

          {/* Add more education items as needed */}
        </div>
      </div>
    </section>
  );
}