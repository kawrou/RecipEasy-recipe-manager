import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const RecipePage = () => {
  return (
    <>
      <div className="w-screen h-6 bg-gray-300"></div>
      <div className="flex divide-x-2 justify-center w-screen">
        <div className="flex flex-1 flex-col p-20 gap-7">
          <div className="font-extrabold text-6xl text-left">
            Enter Your Title Here...
          </div>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Enter your description here..."
          ></textarea>
        </div>
        <div className=" flex justify-center align-middle flex-1 p-20">
          <div className="bg-gray-300 w-96 h-80 rounded-xl"></div>
        </div>
      </div>
    </>
  );
};
