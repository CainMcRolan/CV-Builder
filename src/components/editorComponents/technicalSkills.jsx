import React, { useState, useEffect } from "react";
import { RiSettings5Line, RiExpandUpDownFill } from "@remixicon/react";

export default function Skills({ skills, setSkills }) {
  // New Skill Logic
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: "",
    category: "",
    yearsOfExperience: "",
    description: "",
  });

  const [isAddingNewSkill, setIsAddingNewSkill] = useState(false);

  function handleAddNewSkill() {
    setSkills([...skills, { id: crypto.randomUUID(), ...newSkill }]);
    setNewSkill({
      name: "",
      proficiency: "",
      category: "",
      yearsOfExperience: "",
      description: "",
    });
  }

  function handleNewSkillInputChange(e) {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  }

  const toggleNewSkillForm = () => {
    setIsAddingNewSkill(!isAddingNewSkill);
  };

  // Editing Logic
  const [editingState, setEditingState] = useState({ isEditing: false, targetId: null });
  const [editSkillDetails, setEditSkillDetails] = useState({});

  useEffect(() => {
    if (editingState.targetId !== null) {
      const skillToEdit = skills.find((skill) => skill.id === editingState.targetId);
      setEditSkillDetails(skillToEdit || {});
    }
  }, [editingState.targetId, skills]);

  const toggleEditForm = (isEditing, targetId = editingState.targetId) => {
    setEditingState({
      isEditing,
      targetId,
    });
  };

  const handleSaveEditedSkill = () => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === editSkillDetails.id ? editSkillDetails : skill))
    );
    setEditingState({ isEditing: false, targetId: null });
  };

  function handleEditSkillInputChange(e) {
    const { name, value } = e.target;
    setEditSkillDetails((prev) => ({ ...prev, [name]: value }));
  }

  // DropDown Logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {isAddingNewSkill ? (
        /* New Skill Form */
        <NewSkillForm
          newSkill={newSkill}
          handleAddNewSkill={handleAddNewSkill}
          toggleNewSkillForm={toggleNewSkillForm}
          toggleEditForm={toggleEditForm}
          handleNewSkillInputChange={handleNewSkillInputChange}
        />
      ) : editingState.isEditing ? (
        /* Edit Skill Form */
        <div className="bg-white rounded-xl w-full min-h-24 flex flex-col mt-4">
          <h1 className="font-bold text-xl ml-4 mt-4">Edit Skill</h1>
          {Object.entries(editSkillDetails).map(([key, value]) => {
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
                  onChange={handleEditSkillInputChange}
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
              onClick={handleSaveEditedSkill}
              className="w-24 h-8 text-sm font-bold bg-[#252525] text-white rounded-full hover:opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        /* Skills List */
        <div className="bg-white rounded-xl w-full min-h-24 flex flex-col mt-4">
          <div
            className="min-h-24 flex items-center justify-between cursor-pointer hover:opacity-80"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex ml-8 items-center">
              <RiSettings5Line />
              <h1 className="font-bold text-2xl ml-1">Technical Skills</h1>
            </div>
            <RiExpandUpDownFill className="mr-8 cursor-pointer" />
          </div>
          {isDropdownOpen && (
            <div className="flex flex-col items-center w-full">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="w-[90%] mb-2 bg-slate-50 rounded-xl p-2 mx-8 cursor-pointer hover:bg-slate-100"
                  onClick={() => toggleEditForm(true, skill.id)}
                >
                  <h2 className="font-semibold">{skill.name}</h2>
                  <p>{skill.proficiency}</p>
                  <p>{skill.category}</p>
                </div>
              ))}
              <button
                onClick={() => {
                  toggleNewSkillForm();
                  setEditingState({ isEditing: false, targetId: null });
                }}
                className="w-40 h-8 mt-2 mb-4 text-sm font-bold bg-[#252525] text-white rounded-full hover:opacity-90"
              >
                New Skill
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function NewSkillForm({
  newSkill,
  handleAddNewSkill,
  toggleNewSkillForm,
  toggleEditForm,
  handleNewSkillInputChange,
}) {
  return (
    <div className="bg-white rounded-xl w-full min-h-52 max-h-fit flex flex-col mt-4">
      <h1 className="font-bold text-xl ml-4 mt-4">Add New Skill</h1>
      {/* Display The Input Fields */}
      {Object.entries(newSkill).map(([key, value]) => {
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
              onChange={handleNewSkillInputChange}
            />
          </div>
        );
      })}

      {/* Display Cancel and Save Button */}
      <div className="flex justify-center items-center mt-2 mb-4">
        <button
          onClick={() => {
            toggleEditForm(false);
            toggleNewSkillForm();
          }}
          className="w-24 h-8 text-sm font-bold bg-slate-100  rounded-full mr-4 hover:opacity-90"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleAddNewSkill();
            toggleEditForm(false);
            toggleNewSkillForm();
          }}
          className="w-24 h-8 text-sm font-bold  bg-[#252525] text-white rounded-full hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
}
