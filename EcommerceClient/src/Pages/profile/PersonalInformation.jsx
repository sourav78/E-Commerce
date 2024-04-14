import React from "react";
import ProfileImage from "../../components/profile/perosnal-info/ProfileImage";
import DetailsUpdationForm from "../../components/profile/perosnal-info/DetailsUpdationForm";
import DeleteAccount from "../../components/profile/perosnal-info/DeleteAccount";

const PersonalInformation = () => {


    return (
        <>
            <div className="bg-white py-8 px-8">
                <p className="text-xl font-semibold">Personal Information</p>
                <div className="profile-image mt-4">
                    <ProfileImage/>
                </div>
                <div className="">
                    <div className=" mt-10">
                        <DetailsUpdationForm fieldLable={'Full Name'} field={'fullname'} />
                    </div>
                    <div className=" mt-10">
                        <DetailsUpdationForm fieldLable={'Email Address'} field={'email'} />
                    </div>
                    <div className=" mt-10">
                        <DetailsUpdationForm fieldLable={'Mobile Number'} field={'mobile'} />
                    </div>
                </div>
                <div className="mt-10">
                    <DeleteAccount/>
                </div>
            </div>
        </>
    );
};

export default PersonalInformation;
