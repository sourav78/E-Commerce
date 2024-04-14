import React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { notification } from 'antd';

import {BASE_URL} from '../../../utils/constraints'
import { toggleTrigger } from "../../../redux_slicer/EcomSlicer";

const DetailsUpdationForm = ({field, fieldLable}) => {

    const [api, contextHolder] = notification.useNotification();
    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [isDisabled, setIsDisabled] = useState(true);

    const [userdata, setUserData] = useState("")

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setUserData(user[field] || '');
    }, [user, field]);
    
    const handleEdit = () => {
        setIsDisabled(!isDisabled)
    }

    const handleSave = async () => {
        console.log(userdata);
        console.log(field);

        const updateData = {
            id: user._id,
            field,
            userdata
        }

        try {
            const response = await axios.post(`${BASE_URL}/profile/update-personal-info`, updateData,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
    
            const {data} = response

            data.success && console.log(data.data)
            data.success && setIsDisabled(!isDisabled)
            data.success && dispatch(toggleTrigger())
            data.success && openNotificationWithIcon('success', data.data)

        } catch (error) {
            console.log(error.response.data.msg)
            openNotificationWithIcon('error', error.response.data.msg)
        }

    }

    return (
        <>
            {contextHolder}
            <div className=" flex gap-6">
                <p className="text-lg font-semibold">{fieldLable}</p>
                <button 
                    onClick={handleEdit}
                    className={` ${isDisabled ? `text-[#00ce56]` : `text-red-600`} text-sm font-semibold`}
                >{isDisabled ? `Edit` : `Cancel`}</button>
            </div>
            <div className="flex items-end flex-wrap gap-4">
                <div className="mt-4 lg:w-2/5 sm:w-3/5 w-full">
                    <TextField
                        className="w-full"
                        required
                        disabled = {isDisabled}
                        id="outlined-required"
                        value={userdata}
                        onChange={(e) => setUserData(e.target.value)}
                    />
                </div>
                <button 
                    onClick={handleSave}
                    className={`${isDisabled ? `hidden` : `block`} border-2 border-black rounded-md bg-[#00ed64] px-10 py-2 text-lg font-semibold`}
                >Save</button>
            </div>
        </>
    );
};

export default DetailsUpdationForm;
