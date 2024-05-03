import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {BASE_URL} from '../../../utils/constraints'
import AddressForm from "./AddressForm";
import { notification } from 'antd';

const SingleAddress = ({address, userId, setLoadAddress, setOnDeleteAddress}) => {

    const [api, contextHolder] = notification.useNotification();

    const [showAddressForm, setShowAddressForm] = useState(false)

    const [showBtn, setShowBtn] = useState(false)

    const [addressState, setAddressState] = useState({
        success: false,
        type: '',
        msg: ''
    })
    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

    useEffect(() => {
        if(addressState.type){
            if (addressState.success ) {
                openNotificationWithIcon('success', addressState.msg);
            }else{
                openNotificationWithIcon('error', addressState.msg);
            }
        }
    }, [addressState]);


    const handleNewAddress = () => {
        setShowAddressForm(!showAddressForm)
        setShowBtn(false)
    }


    const showButtons = () => {
        setShowBtn(!showBtn)
    }

    const handleDeleteAddress = async () => {
        console.log(address._id);
        console.log(userId);

        try {
            const response = await axios.post(`${BASE_URL}/profile/delete-address`, {
                id: userId,
                addressId: address._id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            const {data} = response

            data.success && setLoadAddress(prev => !prev)
            data.success && setOnDeleteAddress({success: true, type: 'success', msg: data.data})
        } catch (error) {
            console.log(error.message);
            console.log(error.response.data.msg);
            setOnDeleteAddress({success: true, type: 'error', msg: error.response.data.msg})
        }
    }

    return (
        <>
        {contextHolder}
            <div className="w-full border-b border-gray-300 sm:p-6 p-2">
                {
                    showAddressForm ? (
                        <AddressForm setShowAddressForm={setShowAddressForm} setLoadAddress={setLoadAddress} address={address} setAddressStatus={setAddressState}/>
                    ) : (
                        <div className="">
                            <div className="flex justify-between items-center">
                                <span className="px-[6px] py-[3px] rounded-sm text-[12px] font-semibold text-white bg-green-500 capitalize">{address.type}</span>
                                <div className="relative">
                                    <BsThreeDotsVertical 
                                        className="cursor-pointer"
                                        onClick={showButtons}
                                    />
                                    {
                                        showBtn && (
                                            <div className="px-6 py-3 bg-white shadow-xl absolute right-0">
                                                <button 
                                                    onClick={handleNewAddress} 
                                                    className="text-sm block  text-center w-full font-semibold text-gray-600 hover:text-[#00ce56]"
                                                >Edit</button>
                                                <button 
                                                    onClick={handleDeleteAddress}
                                                    className="text-sm block mt-2 text-center w-full font-semibold text-gray-600 hover:text-[#00ce56]"
                                                >Delete</button>
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
                    )
                }
            </div>
        </>
    );
};

export default SingleAddress;
