import React from "react";
import { FaPowerOff } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleTrigger } from "../../redux_slicer/EcomSlicer.js";
import axios from "axios";
import {useNavigate} from 'react-router-dom'



const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            withCredentials: true
        })

        const data = response.data
        dispatch(toggleTrigger())
        data.success && navigate('/')
    }

    return (
        <>
            <div className=" sm:mt-4 mt-0">
                <button 
                    onClick={handleLogout}
                    className="sm:w-full w-1/2 m-auto bg-white p-3 text-lg sm:text-start text-center shadow flex sm:justify-start justify-center items-center sm:gap-2 gap-5 font-semibold hover:text-red-500 transition-all">
                    <FaPowerOff className="text-lg text-red-500" />Logout
                </button>
            </div>
        </>
    );
};

export default Logout;
