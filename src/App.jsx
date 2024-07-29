import NavigationBar from "./components/navigationBar";
import Editor from "./components/editorMain";
import PDFDisplay from "./components/pdfDisplay";
import React, {useState, useRef} from "react";
import data from "./mocks/data.json";
import { useReactToPrint } from "react-to-print";

function App() {
  const [title, setTitle] = useState("Resume No.1");
  const [personalDetails, setPersonalDetails] = useState(data.personalDetails);
  const [projects, setProjects] = useState(data.projects);
  const [professionalExp, setProfessionalExp] = useState(data.professionalExp);
  const [technicalSkills, setTechnicalSkills] = useState(data.technicalSkills);

  //Printing Logic
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <div className="min-w-full min-h-full flex">
      <NavigationBar></NavigationBar>
      <Editor title={title} setTitle={setTitle} personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} projects={projects} setProjects={setProjects} professionalExp={professionalExp} setProfessionalExp={setProfessionalExp} handlePrint={handlePrint} skills={technicalSkills} setSkills={setTechnicalSkills}></Editor>
      <PDFDisplay personalDetails={personalDetails} projects={projects} professionalExp={professionalExp} technicalSkills={technicalSkills} ref={componentRef}></PDFDisplay>
    </div>
  );
}

export default App;
