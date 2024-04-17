import React from "react";
import AddNewAddress from "../../components/profile/address/AddNewAddress";
import AllAddress from "../../components/profile/address/AllAddress";

const Address = () => {
    return (
        <>
            <div className="bg-white py-8 px-8">
                <p className="text-xl font-semibold">Manage Address</p>
                <div className="mt-4">
                    <AddNewAddress />
                </div>
                <div className="mt-8">
                    <AllAddress/>
                </div>
            </div>
        </>
    );
};

export default Address;
