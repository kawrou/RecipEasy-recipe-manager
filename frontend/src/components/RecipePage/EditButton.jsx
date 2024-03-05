import React from "react";
import { FaEdit } from "react-icons/fa";

export const EditButton = ({ editMode, setEditMode }) => {
  return (
    <button
      className={
        "fixed bottom-10 right-10 bg-white hover:bg-gray-100 border border-gray-900 font-bold h-10 px-4 rounded-lg flex items-center"
      }
      onClick={() => setEditMode(!editMode)}
    >
      <>
        <FaEdit className="mr-2" />
        Edit
      </>
    </button>
  );
};
