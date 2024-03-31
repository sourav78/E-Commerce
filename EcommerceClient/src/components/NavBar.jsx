import React, { useState } from "react";
import s78_black from "../assets/S78_b.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const NavBar = () => {

    const [openNav, setOpenNav] = useState(false)

    return (
        <>
            <div className="py-3 lg:px-16 p-4 border-black bg-gray-100 shadow-md flex justify-between items-center z-10">
                <div className="lg:w-32 w-24 flex items-end">
                    <img src={s78_black} alt="" />
                    <p className="text-4xl font-semibold">Store</p>
                </div>
                <div className="nav-items flex items-center overflow-x-hidden">
                    <ul className={`lg:flex z-20 items-center gap-6 text-2xl font-semibold lg:flex-row flex-col lg:static absolute top-0 ${openNav ? `right-0` : `right-full`}  lg:w-auto w-3/4 lg:bg-transparent bg-gray-100 shadow-md lg:h-auto h-screen p-1`}>
                        <li className=" mt-6 lg:hidden p-1 inline-block bg-black text-white"
                            onClick={() => setOpenNav(false)}
                        >
                            <RxCross2 />
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent hover:border-black cursor-pointer mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black hover:text-white`}`)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent hover:border-black cursor-pointer mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/product" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black hover:text-black`}`)}
                            >
                                Product
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent hover:border-black cursor-pointer mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/about" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black hover:text-black`}`)}
                            >
                                About
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent  cursor-pointer mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/cart" 
                                className={({ isActive }) => (`${isActive ? `text-blue-500`:`text-black `}`)}
                            >
                                <FiShoppingCart className="text-3xl hover:text-blue-500" />
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent hover:border-black cursor-pointer mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/about" 
                                className={({ isActive }) => (`flex items-center gap-1 ${isActive ? `text-blue-500`:`text-black hover:text-black`}`)}
                            >
                                <FiLogIn className="text-gray-700" />Login
                            </NavLink>
                        </li>
                    </ul>
                    <div className="lg:hidden block">
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
