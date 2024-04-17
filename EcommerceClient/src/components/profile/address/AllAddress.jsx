import React, { useEffect, useState } from "react";
import SingleAddress from "./SingleAddress";
import axios from "axios";
import {BASE_URL} from '../../../utils/constraints'
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

const AllAddress = () => {

    const user = useSelector(state => state.user)

    const [address, setAddress] = useState([])

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
    }, [user])

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
            <div className="border border-gray-300">
                {
                    address && (
                        <>
                            {
                                address.map(add => (
                                    <SingleAddress address={add} userId={user._id}/>
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
