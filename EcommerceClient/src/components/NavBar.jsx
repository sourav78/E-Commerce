import React, { useState } from "react";
import s78_black from "../assets/S78_b.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const NavBar = () => {

    const [openNav, setOpenNav] = useState(false)

    return (
        <>
            <div className="py-3 sm:px-16 p-4 border-black bg-gray-100 shadow-md flex justify-between items-center z-10">
                <div className="sm:w-32 w-24 flex items-end">
                    <img src={s78_black} alt="" />
                    <p className="text-4xl font-semibold">Store</p>
                </div>
                <div className="nav-items flex items-center overflow-x-hidden">
                    <ul className={`sm:flex z-20 items-center gap-11 text-2xl font-semibold sm:flex-row flex-col sm:static absolute top-0 ${openNav ? `right-0` : `right-full`}  sm:w-auto w-3/4 sm:bg-transparent bg-slate-200 sm:h-auto h-screen p-1`}>
                        <li className=" mt-6 sm:hidden p-1 inline-block bg-black text-white"
                            onClick={() => setOpenNav(false)}
                        >
                            <RxCross2 />
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className=" hover:text-white hover:bg-black transition-all cursor-pointer mt-4 text-white sm:text-black border sm:border-none border-gray-300 sm:p-0 sm:px-2 p-2 rounded-md sm:bg-transparent bg-slate-500">
                            <NavLink to="/" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black hover:text-white`}`)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className=" hover:text-white hover:bg-black transition-all cursor-pointer mt-4 text-white sm:text-black border sm:border-none border-gray-300 sm:p-0 sm:px-2 p-2 rounded-md sm:bg-transparent bg-slate-500">
                            <NavLink to="/product" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black hover:text-white`}`)}
                            >
                                Product
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className=" hover:text-white hover:bg-black transition-all cursor-pointer mt-4 text-white sm:text-black border sm:border-none border-gray-300 sm:p-0 sm:px-2 p-2 rounded-md sm:bg-transparent bg-slate-500">
                            <NavLink to="/about" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black hover:text-white`}`)}
                            >
                                About
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="hover:text-blue-700 transition-all cursor-pointer mt-4 text-white sm:text-black border sm:border-none border-gray-300 sm:p-0 p-2 rounded-md sm:bg-transparent bg-slate-500">
                            <NavLink to="/cart" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black `}`)}
                            >
                                <FiShoppingCart className="text-3xl" />
                            </NavLink>
                        </li>
                    </ul>
                    <div className="sm:hidden block">
                        <FaBars 
                            onClick={() => setOpenNav(true)}
                        className="text-3xl" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
