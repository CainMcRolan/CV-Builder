import React from "react";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "@remixicon/react";

const PDFDisplay = React.forwardRef(
  ({ personalDetails, projects, professionalExp, technicalSkills }, ref) => {
    return (
      <div
        ref={ref}
        className="my-8 mx-[2.5%] h-auto min-w-[210mm] flex flex-col items-center bg-white"
      >
        <div className="w-[215.9mm] h-[279.4mm] border p-8 flex flex-col overflow-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            {personalDetails.name.toUpperCase()}
          </h1>
          <div className="text-center mb-8 flex justify-evenly">
            <p>
              <RiMailLine className="inline-block"></RiMailLine>
              {personalDetails.email}
            </p>
            <p>
              <RiPhoneLine className="inline-block"></RiPhoneLine>
              {personalDetails.phone}
            </p>
            <p>
              <RiMapPinLine className="inline-block"></RiMapPinLine>
              {personalDetails.location}
            </p>
          </div>
          <div className="mb-2">
            <h2 className="text-xl font-bold border-b mb-2">PROJECTS</h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-4 w-full">
                <p className="font-bold text-sm">{project.title} &nbsp;</p>
                <p className="italic text-sm">{project.subTitle}</p>
                <span className="text-xs opacity-90">
                  {project.startDate} - {project.endDate}
                </span>
                <p className="text-sm">• &nbsp;{project.description}</p>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <h2 className="text-xl font-bold border-b mb-4">PROFESSIONAL EXPERIENCE</h2>
            {professionalExp.map((exp) => (
              <div key={exp.id} className="mb-4">
                <p className="font-bold text-sm">{exp.title} &nbsp; </p>
                <p className="italic text-sm">{exp.subTitle}</p>
                <span className="text-xs opacity-90">
                  {exp.startDate} - {exp.endDate}
                </span>
                <p className="text-sm">• &nbsp;{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <h2 className="text-xl font-bold border-b mb-4">TECHNICAL SKILLS</h2>
            {technicalSkills.map((skills) => (
              <div key={skills.id} className="mb-4">
                <p className="font-bold text-sm">
                  {skills.name} &nbsp;
                  <span className="text-xs opacity-90">{skills.category}</span>{" "}
                </p>
                <p className="italic text-sm">{skills.proficiency}</p>
                <span className="text-xs opacity-90">Experience: {skills.yearsOfExperience}</span>
                <p className="text-sm">• &nbsp;{skills.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default PDFDisplay;
