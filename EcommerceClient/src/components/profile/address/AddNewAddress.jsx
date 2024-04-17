import React from "react";
import { FaPlus } from "react-icons/fa6";

const AddNewAddress = () => {
    return (
        <>
            <div className="p-3 border border-gray-300 flex justify-start items-center gap-4 cursor-pointer">
                <FaPlus className="font-semibold text-[#00ce56]" />
                <p className="font-semibold text-[#00ce56]">ADD NEW ADDRESS</p>
            </div>
        </>
    );
};

export default AddNewAddress;
