import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import AddressForm from "./AddressForm";
import { notification } from 'antd';

const AddNewAddress = () => {

    
    const [api, contextHolder] = notification.useNotification();

    const [showAddressForm, setShowAddressForm] = useState(false)

    const [addressState, setAddressState] = useState({
        success: false,
        type: '',
        msg: ''
    })

    useEffect(() => {
        if(addressState.type){
            if (addressState.success ) {
                openNotificationWithIcon('success', addressState.msg);
            }else{
                openNotificationWithIcon('error', addressState.msg);
            }
        }
    }, [addressState]);

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

    const handleNewAddress = () => {
        setShowAddressForm(!showAddressForm)
    }

    return (
        <>
        {contextHolder}
            {
                showAddressForm ? (
                    <AddressForm setShowAddressForm = {setShowAddressForm} setAddressStatus={setAddressState}/>
                ) : (
                    <div 
                        onClick={handleNewAddress}
                        className="p-3 border border-gray-300 flex justify-start items-center gap-4 cursor-pointer">
                        <FaPlus className="font-semibold text-[#00ce56]" />
                        <p className="font-semibold text-[#00ce56]">ADD NEW ADDRESS</p>
                    </div>
                )
            }
        </>
    );
};

export default AddNewAddress;
