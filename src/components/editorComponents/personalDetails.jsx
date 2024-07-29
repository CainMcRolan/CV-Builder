import React, { useState } from "react";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiExchangeLine } from "@remixicon/react";
import Kuromi from "../../assets/images/Kuromi.jpg";

export default function PersonalDetails({ personalDetails, setPersonalDetails }) {
  const [isEditing, setIsEditing] = useState(false);

  const handlePersonalDetails = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {!isEditing ? (
        <div className="bg-white rounded-xl w-full min-h-52 max-h-fit flex items-center justify-between mt-4">
          <div className="ml-8 flex flex-col">
            <h1 className="font-bold text-xl mb-2 flex items-center">
              {personalDetails.name.toUpperCase()}
              <button onClick={toggleIsEditing} className="flex items-center">
                <RiExchangeLine className="inline-block ml-2 cursor-pointer" />
              </button>
            </h1>
            <p>
              <RiMailLine className="inline-block mr-1" />
              {personalDetails.email}
            </p>
            <p>
              <RiPhoneLine className="inline-block mr-1" />
              {personalDetails.phone}
            </p>
            <p>
              <RiMapPinLine className="inline-block mr-1" />
              {personalDetails.location}
            </p>
          </div>
          <div className="mr-8 flex">
            <img src={Kuromi} alt="" width={120} className="rounded-full" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl w-full min-h-52 max-h-fit flex flex-col mt-4">
          <h1 className="font-bold text-xl ml-4 mt-4">Edit Personal Details</h1>
          {/* Display The Input Fields  */}
          {Object.entries(personalDetails).map(([key, value]) => {
            return (
              <div className="ml-[5%] mt-2 w-[90%] mb-2">
                <p className="font-bold text-xs ml-2 mb-1">
                  {key.toUpperCase()}{" "}
                  <span className="ml-1 font-extralight text-[10px]">required</span>
                </p>
                <input
                  type="text"
                  value={value}
                  name={key}
                  className="bg-[#f3f4f6] w-full p-2 rounded-md"
                  onChange={handlePersonalDetails}
                />
              </div>
            );
          })}
          <div className="flex justify-center items-center mt-2 mb-4">
            <button
              onClick={toggleIsEditing}
              className="w-24 h-8 text-sm font-bold bg-slate-100  rounded-full mr-4 hover:opacity-90"
            >
              cancel
            </button>
            <button
              onClick={toggleIsEditing}
              className="w-24 h-8 text-sm font-bold  bg-[#252525] text-white rounded-full hover:opacity-90"
            >
              save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
