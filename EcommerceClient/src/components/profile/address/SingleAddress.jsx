import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const SingleAddress = ({address, userId}) => {

    const [showBtn, setShowBtn] = useState(false)

    const showButtons = () => {
        setShowBtn(!showBtn)
    }

    return (
        <>
            <div className="w-full border-b border-gray-300 p-6">
                <div className="flex justify-between items-center">
                    <span className="px-[6px] py-[3px] rounded-sm text-[12px] font-semibold text-white bg-green-500">{address.type}</span>
                    <div className="relative">
                        <BsThreeDotsVertical 
                            className="cursor-pointer"
                            onClick={showButtons}
                        />
                        {
                            showBtn && (
                                <div className="px-6 py-3 bg-white shadow-xl absolute right-0">
                                    <button className="text-sm block  text-center w-full font-semibold text-gray-600 hover:text-[#00ce56]">Edit</button>
                                    <button className="text-sm block mt-2 text-center w-full font-semibold text-gray-600 hover:text-[#00ce56]">Delete</button>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex gap-4 mt-2">
                    <span className="font-semibold text-sm">{address.name}</span>
                    <span className="font-semibold text-sm">{address.mobile}</span>
                </div>
                <div className=" lg:w-10/12 w-full mt-2">
                    <span className="text-sm">{address.area}, </span>
                    <span className="text-sm">{address.locality}, </span>
                    <span className="text-sm">{address.city}, </span>
                    <span className="text-sm">{address.state} - </span>
                    <span className="text-sm font-semibold">{address.postalCode}</span>
                </div>
            </div>
        </>
    );
};

export default SingleAddress;
