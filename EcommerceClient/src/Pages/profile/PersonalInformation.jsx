import React from "react";
import ProfileImage from "../../components/profile/perosnal-info/ProfileImage";

const PersonalInformation = () => {
    return (
        <>
            <div className="bg-white py-4 px-8">
                <p className="text-xl font-semibold">Personal Information</p>
                <div className="profile-image mt-4">
                    <ProfileImage/>
                </div>
            </div>        
        </>
    );
};

export default PersonalInformation;
