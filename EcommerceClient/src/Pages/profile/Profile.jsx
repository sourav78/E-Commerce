import React from "react";
import { Outlet } from "react-router-dom";

import ProfileSideNav from "../../components/profile/ProfileSideNav.jsx";

import Logout from "../../components/profile/Logout";

const Profile = () => {


    return (
        <>
            <div className=" border-black mt-4 sm:w-4/5 w-full m-auto flex sm:flex-row flex-col gap-4">
                <ProfileSideNav/>
                <div className="bg-white p-4 flex-grow h-full">
                    <Outlet/>
                </div>
                <div className=" sm:hidden block">
                    <Logout/>
                </div>
            </div>
        </>
    );
};

export default Profile;
