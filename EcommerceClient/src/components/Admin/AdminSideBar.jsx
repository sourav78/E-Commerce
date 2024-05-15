import React, { useState } from 'react'
import S78_w from '../../assets/S78_w.png'
import { RiSkipLeftLine } from "react-icons/ri";
import { Link, NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";
import { MdOutlineAddBusiness } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { BsPersonAdd } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { FiTag } from "react-icons/fi";
import { MdAddchart } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const AdminSideBar = ({responsiveClose, setResponsiveClose}) => {

    const [smallBar, setSmallBar] = useState(false)

    const [toggleProduct, setToggleProduct] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    const [toggleCoupon, setToggleCoupon] = useState(false)

    return (
        <>
            <div className={`${smallBar ? "w-[5%]" : "w-1/2 sm:w-1/4 lg:w-1/6"} sm:static sm:z-0 z-10 absolute ${responsiveClose ? '-left-0' : "-left-full"} flex flex-col h-screen border-r border-[#BDBDBD] px-2 bg-blue-500 text-white transition-all`}>
                <div className="py-4">
                    <div className={"flex justify-between gap-1 items-center"}>
                        <div className={`flex items-end justify-start`}>
                            <img className={`${smallBar ? 'w-full' : 'w-[40%]'}`} src={S78_w} alt="" />
                            {!smallBar && <p className='text-2xl font-bold'>Store</p>}
                        </div>
                        <div className="sm:block hidden">
                            <RiSkipLeftLine 
                                onClick={() => setSmallBar(!smallBar)}
                                className={` ${smallBar && 'rotate-180'} text-3xl p-[2px] bg-blue-700 hover:bg-blue-800 rounded-full cursor-pointer transition-all`} />
                        </div>
                        <div className="sm:hidden block">
                            <RiSkipLeftLine 
                                onClick={() => setResponsiveClose(false)}
                                className={` ${smallBar && 'rotate-180'} text-3xl p-[2px] bg-blue-700 hover:bg-blue-800 rounded-full cursor-pointer transition-all`} />
                        </div>
                    </div>
                </div>
                <div className="mt-4 pb-2 flex-1">
                    <div className="h-full relative">
                        <div className="">
                            <div className="">
                                <NavLink to="/admin" className={({ isActive }) =>
                                    `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${location.pathname === '/admin' ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                }>
                                    <LuLayoutDashboard className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                    <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Dashboard</span>
                                </NavLink>
                            </div>

                            <div className="mt-2 transition-all">
                                <div
                                    onClick={() => setToggleProduct(!toggleProduct)} 
                                    className={`flex ${smallBar? 'justify-center':'justify-between'} items-center gap-2 text-white hover:bg-blue-400 hover:text-black transition-all cursor-pointer p-2 rounded-lg`}>
                                    <div className="flex items-center justify-start gap-2">
                                        <IoStorefrontOutline  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                        <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Products</span>
                                    </div>
                                    {!smallBar && <IoIosArrowUp className={`${toggleProduct && 'rotate-180'} transition-all`} />}
                                </div>
                                <div className={`mt-1 ${!toggleProduct && 'hidden'} select-none p-2 bg-blue-600 transition-transform`}>
                                    <div className="">
                                        <NavLink to="/admin/all-products" className={({ isActive }) =>
                                            `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${isActive ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                        }>
                                            <BsBoxes  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                            <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>All Products</span>
                                        </NavLink>
                                    </div>
                                    <div className="mt-2">
                                        <NavLink to="/admin/create-products" className={({ isActive }) =>
                                            `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${isActive ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                        }>
                                            <MdOutlineAddBusiness  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                            <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Create Products</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <NavLink to="/admin/orders" className={({ isActive }) =>
                                    `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${isActive ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                }>
                                    <BsBoxSeam className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                    <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Orders</span>
                                </NavLink>
                            </div>

                            <div className="mt-2 transition-all">
                                <div
                                    onClick={() => setToggleUser(!toggleUser)} 
                                    className={`flex ${smallBar? 'justify-center':'justify-between'} items-center gap-2 text-white hover:bg-blue-400 hover:text-black transition-all cursor-pointer p-2 rounded-lg`}>
                                    <div className="flex items-center justify-start gap-2">
                                        <FaRegUser  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                        <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Users</span>
                                    </div>
                                    {!smallBar && <IoIosArrowUp className={`${toggleUser && 'rotate-180'} transition-all`} />}
                                </div>
                                <div className={`mt-1 ${!toggleUser && 'hidden'} select-none p-2 bg-blue-600 transition-transform`}>
                                    <div className="">
                                        <NavLink to="/admin/all-users" className={({ isActive }) =>
                                            `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${isActive ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                        }>
                                            <GrGroup  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                            <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>All Users</span>
                                        </NavLink>
                                    </div>
                                    <div className="mt-2">
                                        <NavLink to="/admin/create-users" className={({ isActive }) =>
                                            `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${isActive ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                        }>
                                            <BsPersonAdd  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                            <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Create Users</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 transition-all">
                                <div
                                    onClick={() => setToggleCoupon(!toggleCoupon)} 
                                    className={`flex ${smallBar? 'justify-center':'justify-between'} items-center gap-2 text-white hover:bg-blue-400 hover:text-black transition-all cursor-pointer p-2 rounded-lg`}>
                                    <div className="flex items-center justify-start gap-2">
                                        <RiCoupon3Line  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                        <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Coupons</span>
                                    </div>
                                    {!smallBar && <IoIosArrowUp className={`${toggleCoupon && 'rotate-180'} transition-all`} />}
                                </div>
                                <div className={`mt-1 ${!toggleCoupon && 'hidden'} select-none p-2 bg-blue-600 transition-all`}>
                                    <div className="">
                                        <NavLink to="/admin/all-coupons" className={({ isActive }) =>
                                            `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${isActive ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                        }>
                                            <FiTag  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                            <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>All Coupons</span>
                                        </NavLink>
                                    </div>
                                    <div className="mt-2">
                                        <NavLink to="/admin/create-coupons" className={({ isActive }) =>
                                            `flex ${smallBar? 'justify-center':'justify-start'} items-center gap-2 ${isActive ? `bg-blue-400 text-black` : `text-white hover:bg-blue-300 hover:text-black`} transition-all  p-2 rounded-lg`
                                        }>
                                            <MdAddchart  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                                            <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Create Coupons</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        <Link to='/' className={`bg-blue-600 cursor-pointer rounded w-full px-2 py-2 absolute bottom-0 flex items-center ${smallBar ? 'justify-center' : 'justify-start'} gap-2`}>
                            <MdLogout  className={`${smallBar ? 'text-3xl': 'text-2xl'}`} />
                            <span className={`font-semibold ${smallBar?`hidden`:`block`}`}>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSideBar