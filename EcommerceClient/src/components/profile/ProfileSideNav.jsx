import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

import Logout from "./Logout";

const ProfileSideNav = () => {

    const user = useSelector(state => state.user)

    return (
        <>
            <div className="sm:w-1/4 w-full h-full">
                <div className="profile sm:flex hidden p-2 bg-white shadow gap-3 items-center">
                    <div className="w-14 rounded-full overflow-hidden">
                        <img className="w-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="">
                        <p className="text-[12px]">Hello</p>
                        <p className="text-[16px] font-semibold">{user.fullname}</p>
                    </div>
                </div>
                <div className="items sm:bg-white sm:mt-4 mt-0 shadow sm:block flex justify-start gap-5 bg-[#aaf8b6] sm:p-0 p-2 lg:overflow-hidden overflow-x-scroll no-scrollbar whitespace-nowrap">
                    <NavLink to='/profile' className={({isActive}) => `flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold sm:border-b sm:border-gray-200 ${location.pathname === '/profile' ? 'sm:bg-[#aaf8b6bf] bg-[#00ed64] sm:border-none border-2 border-black ' : 'bg-white hover:bg-[#aaf8b647]'}  transition-all`}>
                        <FaUser className="text-lg" /> Personal Info
                    </NavLink>
                    <NavLink to='/profile/address' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold sm:border-b sm:border-gray-200 ${isActive ? `sm:bg-[#aaf8b6bf] bg-[#00ed64] sm:border-none border-2 border-black `: `bg-white`} ${user.isAdmin === 'ADMIN' ? '' : `hidden`} hover:bg-[#aaf8b647] transition-all`}>
                        <MdAdminPanelSettings className="text-lg" />Admin Panel
                    </NavLink>
                    <NavLink to='/profile/address' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold sm:border-b sm:border-gray-200 ${isActive ? `sm:bg-[#aaf8b6bf] bg-[#00ed64] sm:border-none border-2 border-black `: `bg-white hover:bg-[#aaf8b647]`} transition-all`}>
                        <FaLocationDot />Address
                    </NavLink>
                    <NavLink to='/profile/orders' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold sm:border-b sm:border-gray-200 ${isActive ? `sm:bg-[#aaf8b6bf] bg-[#00ed64] sm:border-none border-2 border-black `: `bg-white hover:bg-[#aaf8b647]`}  transition-all`}>
                        <MdProductionQuantityLimits className="text-lg" />Orders
                    </NavLink>
                    <NavLink to='/profile/wishlist' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold sm:border-b sm:border-gray-200 ${isActive ? `sm:bg-[#aaf8b6bf] bg-[#00ed64] sm:border-none border-2 border-black `: `bg-white hover:bg-[#aaf8b647]`}  transition-all`}>
                        <FaHeart className="text-lg" />Wishlist
                    </NavLink>
                    <NavLink to='/profile/usercarts' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold sm:border-b sm:border-gray-200 ${isActive ? `sm:bg-[#aaf8b6bf] bg-[#00ed64] sm:border-none border-2 border-black `: `bg-white hover:bg-[#aaf8b647]`}  transition-all`}>
                        <FaShoppingCart className="text-lg" />Cart
                    </NavLink>
                </div>

                <div className=" sm:block hidden">
                    <Logout/>
                </div>
            </div>
        </>
    );
};

export default ProfileSideNav;
