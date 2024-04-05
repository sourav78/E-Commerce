import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleTrigger } from "../redux_slicer/EcomSlicer";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await axios.get('http://localhost:4001/auth/logout', {
            withCredentials: true
        })

        const data = response.data
        dispatch(toggleTrigger())
        data.success && navigate('/')
        console.log(data);
    }

    return (
        <>
            <div className="">
                <button className="border p-2" onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
};

export default Profile;
