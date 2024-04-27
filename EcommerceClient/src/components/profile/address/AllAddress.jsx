import React, { useEffect, useState } from "react";
import SingleAddress from "./SingleAddress";
import axios from "axios";
import {BASE_URL} from '../../../utils/constraints'
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { notification } from 'antd';

const AllAddress = () => {

    const [api, contextHolder] = notification.useNotification();

    const user = useSelector(state => state.ecom.user)

    const [address, setAddress] = useState([])

    const [loadAddress, setLoadAddress] = useState(false)

    const [onDeleteAddress, setOnDeleteAddress] = useState({
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

        async function fetchAllAddress(){
            
            try {
                const response = await axios.get(`${BASE_URL}/profile/get-address/${user._id}`)

                const {data} = response

                data.success && console.log(data.data);
                data.success && setAddress(data.data)
            } catch (error) {
                console.log(error.response.data.msg);
            }

        }

        fetchAllAddress()
    }, [user, loadAddress])

    useEffect(() => {
        if (onDeleteAddress.success) {
            openNotificationWithIcon('success', onDeleteAddress.msg);
        }
    }, [onDeleteAddress]);

    if(!address){
        return (
            <>
                <div className="w-full h-96 flex justify-center items-center">
                    <CircularProgress />
                </div>
            </>
        )
    }

    return (
        <>
            {contextHolder}
            <div className="border border-gray-300">
                {
                    address && (
                        <>
                            {
                                address.map(add => (
                                    <div key={add._id}>
                                        <SingleAddress address={add} userId={user._id} setLoadAddress={setLoadAddress} setOnDeleteAddress={setOnDeleteAddress}/>
                                    </div>
                                ))
                            }
                        </>
                    )
                }
            </div>
        </>
    );
};

export default AllAddress;
