import React from "react";
import { FaEdit } from "react-icons/fa";

export const EditButton = ({ editMode, setEditMode }) => {
  return (
    <button
      className={
        "fixed bottom-10 right-10 bg-white border border-primary-500 font-kanit font-bold text-lg text-primary-500 hover:bg-primary-500 hover:text-white h-12 px-4 rounded-lg flex items-center shadow-md"
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
