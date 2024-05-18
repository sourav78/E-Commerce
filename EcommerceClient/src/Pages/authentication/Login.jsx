import React, {useState} from "react";
import logo from '../../assets/S78_b.png'
import {Link, useNavigate} from 'react-router-dom'
import { Alert} from 'antd';
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleTrigger } from "../../redux_slicer/EcomSlicer.js";


const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showErrors, setShowErrors] = useState('')

    const dispatch = useDispatch()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const loginData = {email, password}

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            )

            const data = await response.data
            dispatch(toggleTrigger())
            data.success && navigate('/')
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
            setShowErrors(error.response.data.msg)
        }
    }

    const handleAlertClose = () => {
        setShowErrors('')
    }
    return (
        <>
            <div className="w-full h-screen p-2 border-black bg-gray-200 flex justify-center items-start " style={{ minHeight: 'calc(100vh - 85px)' }}>
                <div className=" border-black lg:w-1/3 sm:w-1/2 w-full py-4 px-1 bg-white mt-10">
                    <div className="flex items-end justify-center">
                        <div className="w-1/3 ">
                            <img src={logo} alt="" />
                        </div>
                        <p className="text-4xl font-bold mb-1">Store</p>
                    </div>
                    <div className="">
                        <p className="text-3xl font-semibold text-center mt-4">Login</p>
                    </div>
                    {
                        showErrors && (
                            <div className=" mt-2 px-4">
                                <Alert
                                    message={showErrors}
                                    type="error"
                                    closable
                                    onClose={handleAlertClose}
                                />
                            </div>
                        )
                    }
                    <form className="mt-4" onSubmit={handleFormSubmit}>
                        <div className=" px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Username/Email:</label>
                            <input 
                                className="mt-2 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="text" 
                                required 
                                placeholder="example@email.com" 
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Password:</label>
                            <input 
                                className="mt-2 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="password" 
                                required 
                                placeholder="[):sjs&8" 
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-6 px-6">
                            <button 
                                className="bg-[#00ed64] border-2 border-black w-full text-black text-xl py-1 hover:bg-[#69f287] transition-all"
                            >Login</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">Don't have an account? <Link to="/register" className="text-[#00ed64]" >Register now</Link></p>
                    
                </div>  
            </div>
        </>
    );
};

export default Login;
