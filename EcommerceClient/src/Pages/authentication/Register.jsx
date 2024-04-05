import React from "react";
import logo from '../../assets/S78_b.png'
import {Link} from 'react-router-dom'
import { Alert, Space } from 'antd';

const Register = () => {
    return (
        <>
            <div className="w-full p-2 border-black bg-gray-200 flex justify-center items-start " style={{ minHeight: 'calc(100vh - 85px)' }}>
                <div className=" border-black lg:w-1/3 sm:w-1/2 w-full py-4 px-1 bg-white mt-5">
                    <div className="flex items-end justify-center">
                        <div className="w-1/3 ">
                            <img src={logo} alt="" />
                        </div>
                        <p className="text-4xl font-bold mb-1">Store</p>
                    </div>
                    <div className="">
                        <p className="text-3xl font-semibold text-center mt-4">Register</p>
                    </div>
                    <div className=" mt-2 px-4">
                        <Alert
                            message="Warning Text Warning Text TextWarning Text"
                            type="error"
                            closable
                            />
                    </div>
                    <form className="mt-4">
                        <div className=" px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Full Name:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="text" 
                                required 
                                placeholder="John Doe" 
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Username:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="text" 
                                required 
                                placeholder="john77" 
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Email:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="email" 
                                required 
                                placeholder="john@example.com" 
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Password:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="password" 
                                required 
                                placeholder="[):sjs&8" 
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Confirm Password:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="password" 
                                required 
                                placeholder="[):sjs&8" 
                            />
                        </div>
                        <div className="mt-6 px-6">
                            <button 
                                className="bg-black border-2 border-black w-full text-white text-xl py-1 hover:bg-gray-700 transition-all"
                            >Register</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-600" >login</Link></p>
                    
                </div>  
            </div>
        </>
    );
};

export default Register;
