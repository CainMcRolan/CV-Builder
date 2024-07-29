import React, { useState, useEffect } from "react";
import { RiFoldersLine, RiExpandUpDownFill } from "@remixicon/react";

export default function Projects({ projects, setProjects }) {
  // New Project Logic
  const [newProjectDetails, setNewProjectDetails] = useState({
    title: "",
    subTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [isAddingNewProject, setIsAddingNewProject] = useState(false);

  const handleAddNewProject = () => {
    setProjects([...projects, { id: crypto.randomUUID(), ...newProjectDetails }]);
    setNewProjectDetails({
      title: "",
      subTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleNewProjectInputChange = (e) => {
    const { name, value } = e.target;
    setNewProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNewProjectForm = () => {
    setIsAddingNewProject(!isAddingNewProject);
  };

  // Editing Logic
  const [editingState, setEditingState] = useState({ isEditing: false, targetId: null });
  const [editProjectDetails, setEditProjectDetails] = useState({});

  useEffect(() => {
    if (editingState.targetId !== null) {
      const projectToEdit = projects.find((project) => project.id === editingState.targetId);
      setEditProjectDetails(projectToEdit || {});
    }
  }, [editingState.targetId, projects]);

  const toggleEditForm = (isEditing, targetId = editingState.targetId) => {
    setEditingState({
      isEditing,
      targetId,
    });
  };

  const handleSaveEditedProject = () => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === editProjectDetails.id ? editProjectDetails : project
      )
    );
    setEditingState({ isEditing: false, targetId: null });
  };

  const handleEditProjectInputChange = (e) => {
    const { name, value } = e.target;
    setEditProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  // DropDown Logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {isAddingNewProject ? (
        /* New Project Form */
        <NewProjectForm
          newProjectDetails={newProjectDetails}
          handleAddNewProject={handleAddNewProject}
          toggleNewProjectForm={toggleNewProjectForm}
          toggleEditForm={toggleEditForm}
          handleNewProjectInputChange={handleNewProjectInputChange}
        />
      ) : editingState.isEditing ? (
        /* Edit Project Form */
        <div className="bg-white rounded-xl w-full min-h-24 flex flex-col mt-4">
          <h1 className="font-bold text-xl ml-4 mt-4">Edit Project</h1>
          {Object.entries(editProjectDetails).map(([key, value]) => {
            if (key === "id") return null;

            return (
              <div key={key} className="ml-[5%] mt-2 w-[90%] mb-2">
                <p className="font-bold text-xs ml-2 mb-1">
                  {key.toUpperCase()}{" "}
                  <span className="ml-1 font-extralight text-[10px]">required</span>
                </p>
                <input
                  type="text"
                  value={value}
                  name={key}
                  className="bg-[#f3f4f6] w-full p-2 rounded-md"
                  onChange={handleEditProjectInputChange}
                />
              </div>
            );
          })}
          <div className="flex justify-center items-center mt-2 mb-4">
            <button
              onClick={() => setEditingState({ isEditing: false, targetId: null })}
              className="w-24 h-8 text-sm font-bold bg-slate-100 rounded-full mr-4 hover:opacity-90"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEditedProject}
              className="w-24 h-8 text-sm font-bold bg-[#252525] text-white rounded-full hover:opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        /* Project List */
        <div className="bg-white rounded-xl w-full min-h-24 flex flex-col mt-4">
          <div
            className="min-h-24 flex items-center justify-between cursor-pointer hover:opacity-80"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex ml-8 items-center">
              <RiFoldersLine />
              <h1 className="font-bold text-2xl ml-1">Projects</h1>
            </div>
            <RiExpandUpDownFill className="mr-8 cursor-pointer" />
          </div>
          {isDropdownOpen && (
            <div className="flex flex-col items-center w-full">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-[90%] mb-2 bg-slate-50 rounded-xl p-2 mx-8 cursor-pointer hover:bg-slate-100"
                  onClick={() => toggleEditForm(true, project.id)}
                >
                  <h2 className="font-semibold">{project.title}</h2>
                  <p>{project.subTitle}</p>
                  <p>
                    {project.startDate} - {project.endDate}
                  </p>
                </div>
              ))}
              <button
                onClick={() => {
                  toggleNewProjectForm();
                  setEditingState({ isEditing: false, targetId: null });
                }}
                className="w-40 h-8 mt-2 mb-4 text-sm font-bold bg-[#252525] text-white rounded-full hover:opacity-90"
              >
                New Project
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function NewProjectForm({
  newProjectDetails,
  handleAddNewProject,
  toggleNewProjectForm,
  toggleEditForm,
  handleNewProjectInputChange,
}) {
  return (
    <div className="bg-white rounded-xl w-full min-h-52 max-h-fit flex flex-col mt-4">
      <h1 className="font-bold text-xl ml-4 mt-4">Add New Project</h1>
      {/* Display The Input Fields */}
      {Object.entries(newProjectDetails).map(([key, value]) => {
        return (
          <div key={key} className="ml-[5%] mt-2 w-[90%] mb-2">
            <p className="font-bold text-xs ml-2 mb-1">
              {key.toUpperCase()} <span className="ml-1 font-extralight text-[10px]">required</span>
            </p>
            <input
              type="text"
              value={value}
              name={key}
              className="bg-[#f3f4f6] w-full p-2 rounded-md"
              onChange={handleNewProjectInputChange}
            />
          </div>
        );
      })}

      {/* Display Cancel and Save Button */}
      <div className="flex justify-center items-center mt-2 mb-4">
        <button
          onClick={() => {
            toggleEditForm(false);
            toggleNewProjectForm();
          }}
          className="w-24 h-8 text-sm font-bold bg-slate-100  rounded-full mr-4 hover:opacity-90"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleAddNewProject();
            toggleEditForm(false);
            toggleNewProjectForm();
          }}
          className="w-24 h-8 text-sm font-bold  bg-[#252525] text-white rounded-full hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
}
