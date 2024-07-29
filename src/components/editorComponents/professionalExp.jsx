import React, { useState, useEffect } from "react";
import { RiFoldersLine, RiExpandUpDownFill } from "@remixicon/react";

export default function Experiences({ experiences, setExperiences }) {
  // New Experience Logic
  const [newExperience, setNewExperience] = useState({
    title: "",
    subTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [isAddingNewExperience, setIsAddingNewExperience] = useState(false);

  function handleAddNewExperience() {
    setExperiences([...experiences, { id: crypto.randomUUID(), ...newExperience }]);
    setNewExperience({
      title: "",
      subTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  function handleNewExperienceInputChange(e) {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  }

  const toggleNewExperienceForm = () => {
    setIsAddingNewExperience(!isAddingNewExperience);
  };

  // Editing Logic
  const [editingState, setEditingState] = useState({ isEditing: false, targetId: null });
  const [editExperienceDetails, setEditExperienceDetails] = useState({});

  useEffect(() => {
    if (editingState.targetId !== null) {
      const experienceToEdit = experiences.find(
        (experience) => experience.id === editingState.targetId
      );
      setEditExperienceDetails(experienceToEdit || {});
    }
  }, [editingState.targetId, experiences]);

  const toggleEditForm = (isEditing, targetId = editingState.targetId) => {
    setEditingState({
      isEditing,
      targetId,
    });
  };

  const handleSaveEditedExperience = () => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((experience) =>
        experience.id === editExperienceDetails.id ? editExperienceDetails : experience
      )
    );
    setEditingState({ isEditing: false, targetId: null });
  };

  function handleEditExperienceInputChange(e) {
    const { name, value } = e.target;
    setEditExperienceDetails((prev) => ({ ...prev, [name]: value }));
  }

  // DropDown Logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {isAddingNewExperience ? (
        /* New Experience Form */
        <NewExperienceForm
          newExperience={newExperience}
          handleAddNewExperience={handleAddNewExperience}
          toggleNewExperienceForm={toggleNewExperienceForm}
          toggleEditForm={toggleEditForm}
          handleNewExperienceInputChange={handleNewExperienceInputChange}
        />
      ) : editingState.isEditing ? (
        /* Edit Experience Form */
        <div className="bg-white rounded-xl w-full min-h-24 flex flex-col mt-4">
          <h1 className="font-bold text-xl ml-4 mt-4">Edit Professional Experience</h1>
          {Object.entries(editExperienceDetails).map(([key, value]) => {
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
                  onChange={handleEditExperienceInputChange}
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
              onClick={handleSaveEditedExperience}
              className="w-24 h-8 text-sm font-bold bg-[#252525] text-white rounded-full hover:opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        /* Experience List */
        <div className="bg-white rounded-xl w-full min-h-24 flex flex-col mt-4">
          <div
            className="min-h-24 flex items-center justify-between cursor-pointer hover:opacity-80"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex ml-8 items-center">
              <RiFoldersLine />
              <h1 className="font-bold text-2xl ml-1">Professional Experience</h1>
            </div>
            <RiExpandUpDownFill className="mr-8 cursor-pointer" />
          </div>
          {isDropdownOpen && (
            <div className="flex flex-col items-center w-full">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="w-[90%] mb-2 bg-slate-50 rounded-xl p-2 mx-8 cursor-pointer hover:bg-slate-100"
                  onClick={() => toggleEditForm(true, experience.id)}
                >
                  <h2 className="font-semibold">{experience.title}</h2>
                  <p>{experience.subTitle}</p>
                  <p>
                    {experience.startDate} - {experience.endDate}
                  </p>
                </div>
              ))}
              <button
                onClick={() => {
                  toggleNewExperienceForm();
                  setEditingState({ isEditing: false, targetId: null });
                }}
                className="w-40 h-8 mt-2 mb-4 text-sm font-bold bg-[#252525] text-white rounded-full hover:opacity-90"
              >
                New Experience
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function NewExperienceForm({
  newExperience,
  handleAddNewExperience,
  toggleNewExperienceForm,
  toggleEditForm,
  handleNewExperienceInputChange,
}) {
  return (
    <div className="bg-white rounded-xl w-full min-h-52 max-h-fit flex flex-col mt-4">
      <h1 className="font-bold text-xl ml-4 mt-4">Add New Experience</h1>
      {/* Display The Input Fields */}
      {Object.entries(newExperience).map(([key, value]) => {
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
              onChange={handleNewExperienceInputChange}
            />
          </div>
        );
      })}

      {/* Display Cancel and Save Button */}
      <div className="flex justify-center items-center mt-2 mb-4">
        <button
          onClick={() => {
            toggleEditForm(false);
            toggleNewExperienceForm();
          }}
          className="w-24 h-8 text-sm font-bold bg-slate-100  rounded-full mr-4 hover:opacity-90"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleAddNewExperience();
            toggleEditForm(false);
            toggleNewExperienceForm();
          }}
          className="w-24 h-8 text-sm font-bold  bg-[#252525] text-white rounded-full hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
}
