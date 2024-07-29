import React, { useState, useRef, useEffect } from "react";
import { RiExchangeLine, RiFileDownloadLine, RiCheckboxCircleFill } from "@remixicon/react";

export default function ResumeName({ title, setTitle, handlePrint }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="bg-white rounded-xl w-full h-20 flex justify-between items-center">
      <div className="flex font-bold font-sans text-2xl items-center ml-12 hover:opacity-80">
        <h1>{!isEditing && title}</h1>
        {isEditing && (
          <input
            type="text"
            value={title}
            ref={inputRef}
            onChange={handleTitle}
            className="bg-white w-full"
          />
        )}
        <button onClick={toggleEditing} className="ml-2">
          {!isEditing ? (
            <RiExchangeLine></RiExchangeLine>
          ) : (
            <RiCheckboxCircleFill color="#252525"></RiCheckboxCircleFill>
          )}
        </button>
      </div>
      <button
        onClick={handlePrint}
        className="flex font-bold font-sans text-base items-center mr-12 bg-[#252525] text-white rounded-full py-2 px-6 hover:opacity-90"
      >
        <p>Download</p>
        <RiFileDownloadLine></RiFileDownloadLine>
      </button>
    </div>
  );
}
