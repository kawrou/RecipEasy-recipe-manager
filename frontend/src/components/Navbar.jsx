import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// on smaller screens burger menu button is shown - toggle open/closed
const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(!isOpen)
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-6">
            <div className="block lg:hidden">
                <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-white">
                    {/* burger menu shown on smaller screens - taken from heroicons */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow mr-5">
                    <NavLink className="inline-block text-center lg:inline-block lg:mt-0 text-blue-600 hover:text-blue-500" to="/">
                        Home
                    </NavLink>
                </div>

                <div>
                    <NavLink className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-600 border-blue-600 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-2" to="/login">
                        Log In
                    </NavLink>

                    <NavLink className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-500 border-gray-500 hover:border-transparent hover:text-blue-500 hover:bg-white" to="/signup">
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar