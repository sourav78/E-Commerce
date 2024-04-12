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
            <div className="w-1/4 h-full">
                <div className="profile p-2 bg-white shadow flex gap-3 items-center">
                    <div className="w-14 rounded-full overflow-hidden">
                        <img className="w-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="">
                        <p className="text-[12px]">Hello</p>
                        <p className="text-[16px] font-semibold">{user.fullname}</p>
                    </div>
                </div>
                <div className="items bg-white mt-4 shadow">
                    <NavLink to='/profile' className={({isActive}) => `flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold border-b border-gray-200 ${location.pathname === '/profile' ? 'bg-[#aaf8b6bf]' : 'bg-white'} hover:bg-[#aaf8b6bf] transition-all`}>
                        <FaUser className="text-lg" /> Personal Info
                    </NavLink>
                    <NavLink to='/profile/address' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold border-b border-gray-200 ${isActive ? `bg-[#aaf8b6bf]`: `bg-white`} ${user.isAdmin === 'ADMIN' ? '' : `hidden`} hover:bg-[#aaf8b6bf] transition-all`}>
                        <MdAdminPanelSettings className="text-lg" />Admin Panel
                    </NavLink>
                    <NavLink to='/profile/address' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold border-b border-gray-200 ${isActive ? `bg-[#aaf8b6bf]`: `bg-white`} hover:bg-[#aaf8b6bf] transition-all`}>
                        <FaLocationDot />Address
                    </NavLink>
                    <NavLink to='/profile/orders' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold border-b border-gray-200 ${isActive ? `bg-[#aaf8b6bf]`: `bg-white`} hover:bg-[#aaf8b6bf] transition-all`}>
                        <MdProductionQuantityLimits className="text-lg" />Orders
                    </NavLink>
                    <NavLink to='/profile/wishlist' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold border-b border-gray-200 ${isActive ? `bg-[#aaf8b6bf]`: `bg-white`} hover:bg-[#aaf8b6bf] transition-all`}>
                        <FaHeart className="text-lg" />Wishlist
                    </NavLink>
                    <NavLink to='/profile/usercarts' className={({isActive}) => ` flex items-center justify-start gap-2 w-full px-4 py-3 font-semibold border-b border-gray-200 ${isActive ? `bg-[#aaf8b6bf]`: `bg-white`} hover:bg-[#aaf8b6bf] transition-all`}>
                        <FaShoppingCart className="text-lg" />Cart
                    </NavLink>
                </div>

                <div className="">
                    <Logout/>
                </div>
            </div>
        </>
    );
};

export default ProfileSideNav;
