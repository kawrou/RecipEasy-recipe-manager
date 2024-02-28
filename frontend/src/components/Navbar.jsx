// import { Fragment } from 'react' // what is fragment?
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(!isOpen)
    }
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-6">
        <div className="block lg:hidden">
            <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>

        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="text-sm lg:flex-grow">
                <NavLink className="block text-center mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-blue-500 mr-4" to="/">
                    Home
                </NavLink>
            </div>

            <div>
                <NavLink className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-600 border-blue-600 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-2" to="/login">
                    Log In
                </NavLink>

                <NavLink className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-500 border-gray-500 hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0" to="/signup">
                    Sign Up
                </NavLink>
            </div>
        </div>
    </nav>
    );
};

export default Navbar