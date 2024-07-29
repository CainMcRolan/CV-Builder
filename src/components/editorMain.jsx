import ResumeName from "./editorComponents/resumeName";
import PersonalDetails from "./editorComponents/personalDetails";
import Projects from "./editorComponents/projects";
import ProfessionalExp from "./editorComponents/professionalExp";
import Skills from "./editorComponents/technicalSkills";

export default function Editor({
  title,
  setTitle,
  personalDetails,
  setPersonalDetails,
  projects,
  setProjects,
  professionalExp,
  setProfessionalExp,
  handlePrint,
  skills,
  setSkills,
}) {
  return (
    <div className="my-8 mx-[2.5%] h-auto w-[35%] flex flex-col items-center">
      <ResumeName title={title} setTitle={setTitle} handlePrint={handlePrint} />
      <PersonalDetails personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />
      <Projects projects={projects} setProjects={setProjects} />
      <ProfessionalExp experiences={professionalExp} setExperiences={setProfessionalExp} />
      <Skills skills={skills} setSkills={setSkills}></Skills>
      <p className="font-bold text-xl mt-10">I Don't Have Time For Other Features 😔</p>
      <p className="font-bold text-xs">Note: Website optimized only for 1920 x 1080 screens</p>
    </div>
  );
}
