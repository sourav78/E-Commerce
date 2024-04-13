import React from "react";
import { useSelector } from "react-redux";

const ProfileImage = () => {

    const user = useSelector(state => state.user)

    return (
        <>
            <div className="flex sm:flex-row flex-col gap-4 sm:items-end items-center">
                <div className="w-44 h-44 overflow-hidden border rounded-full">
                    <img className="w-full h-full object-cover" src={user.imageUrl} alt="" />
                </div>
                <div className="flex gap-4 mb-4">
                    <button className="font-semibold text-[#00ce56]">Change Profile</button>
                    <button className="px-3 py-2 border border-black bg-[#00ed64] font-semibold hover:rounded-md">View Profile</button>
                </div>
            </div>
        </>
    );
};

export default ProfileImage;
