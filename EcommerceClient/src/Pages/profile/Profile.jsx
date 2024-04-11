import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleTrigger } from "../../redux_slicer/EcomSlicer.js";
import { useNavigate } from "react-router-dom";

import {BASE_URL} from '../../utils/constraints.js'

const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await axios.get(`${BASE_URL}/auth/logout`, {
            withCredentials: true
        })

        const data = response.data
        dispatch(toggleTrigger())
        data.success && navigate('/')
        console.log(data);
    }

    return (
        <>
            
        </>
    );
};

export default Profile;
