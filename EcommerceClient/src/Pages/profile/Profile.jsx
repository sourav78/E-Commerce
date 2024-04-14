import React from "react";
import { Outlet } from "react-router-dom";

import ProfileSideNav from "../../components/profile/ProfileSideNav.jsx";

import Logout from "../../components/profile/Logout";

const Profile = () => {


    return (
        <>
            <div className=" border-black my-4 lg:w-4/5 sm:w-11/12 w-full px-2 m-auto flex sm:flex-row flex-col gap-4">
                <ProfileSideNav/>
                <div className="flex-grow h-full bg-white shadow-xl">
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
