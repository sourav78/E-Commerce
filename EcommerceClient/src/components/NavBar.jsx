import React, { useEffect, useState } from "react";
import s78_black from "../assets/S78_b.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateIsAuthenticated, updateUser } from "../redux_slicer/EcomSlicer";

import {BASE_URL} from '../utils/constraints.js'

const NavBar = () => {

    const [openNav, setOpenNav] = useState(false)
    const [numberOfProduct, setNumberOfProduct] = useState(0)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const isAuthenticated = useSelector(state => state.ecom.isAuthenticated)
    const trigger = useSelector(state => state.ecom.trigger)
    const user = useSelector(state => state.ecom.user)

    const cartTriger = useSelector(state => state.product.cartTrigger)

    useEffect(() => {
        async function authenticateUser(){
            try {
                const response = await axios.get(`${BASE_URL}/auth/profile`, {
                    withCredentials: true
                })
                const {data} = response.data
                dispatch(updateIsAuthenticated(true))
                dispatch(updateUser(data))
                console.log(data);
            } catch (error) {
                console.log(error.response.data.msg);
                dispatch(updateIsAuthenticated(false))
                dispatch(updateUser({}))
                navigate('/')
            }
        }

        authenticateUser()
    }, [trigger])

    useEffect(() => {
        async function fetchNumberOfItemInCart(){
            try {
                const response = await axios.get(`${BASE_URL}/product/items-in-cart?userId=${user._id}`, {
                    withCredentials: true
                })
                const {data} = response
                data.success && setNumberOfProduct(data.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchNumberOfItemInCart()
    }, [user, cartTriger])

    return (
        <>
            <div className="py-3 lg:px-16 p-4 border-black bg-gray-100 shadow-md flex justify-between items-center z-10">
                <div className="lg:w-32 w-24 flex items-end">
                    <img src={s78_black} alt="" />
                    <p className="text-4xl font-semibold">Store</p>
                </div>
                <div className="nav-items flex items-center overflow-x-hidden">
                    <ul className={`lg:flex z-20 items-center gap-6 text-2xl font-semibold lg:flex-row flex-col lg:static absolute top-0 ${openNav ? `right-0` : `right-full`}  lg:w-auto w-3/4 lg:bg-transparent bg-gray-100 shadow-md lg:h-auto h-screen p-1`}>
                        <li className="mt-6 lg:hidden p-1 inline-block bg-[#00ed64] text-black border border-black"
                            onClick={() => setOpenNav(false)}
                        >
                            <RxCross2 />
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent hover:border-black cursor-pointer lg:mt-2 mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/" 
                                className={({ isActive }) => (`${isActive ? `text-[#00ce56]`:`text-black hover:text-black`}`)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent hover:border-black cursor-pointer lg:mt-2 mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/product" 
                                className={({ isActive }) => (`${isActive ? `text-[#00ce56]`:`text-black hover:text-black`}`)}
                            >
                                Product
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent hover:border-black cursor-pointer lg:mt-2 mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/about" 
                                className={({ isActive }) => (`${isActive ? `text-[#00ce56]`:`text-black hover:text-black`}`)}
                            >
                                About
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className="border-2 border-black lg:border-transparent  cursor-pointer lg:mt-2 mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all">
                            <NavLink to="/cart" 
                                className={({ isActive }) => (`${isActive ? `text-[#00ce56]`:`text-black `}`)}
                            >
                                <div className="relative sm:block inline-block">
                                    <FiShoppingCart className="text-3xl hover:text-[#00ce56]" />
                                    <p className="border border-black text-black text-[10px] bg-[#00ed64] w-4 h-4 grid place-content-center rounded-full absolute -top-2 -right-2">{numberOfProduct}</p>
                                </div>
                            </NavLink>
                        </li>
                        <li 
                            onClick={() => setOpenNav(false)}
                        className={`${isAuthenticated ? `lg:border-none border-2` : `border-2`} border-black lg:border-transparent hover:border-black cursor-pointer lg:mt-2 mt-4 text-white lg:text-black lg:p-0 lg:px-2 p-2 py-1 lg:rounded-none rounded-lg lg:bg-transparent bg-transparent transition-all`}>
                            <NavLink to={isAuthenticated ? '/profile' : '/login'} 
                                className={({ isActive }) => (`flex items-center gap-1 ${isActive ? `text-[#00ce56]`:`text-black hover:text-black`}`)}
                            >
                                {
                                    !isAuthenticated ? (
                                        <>
                                            <FiLogIn className="text-gray-700" />
                                            <span>Login</span>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-black">
                                                <img className="w-full h-full object-cover" src={user.imageUrl} alt="" />
                                            </div>
                                            <span className="lg:hidden">Profile</span>
                                        </div>
                                    )
                                }
                            </NavLink>
                        </li>
                    </ul>
                    <div className="lg:hidden block">
                        <FaBars 
                            onClick={() => setOpenNav(true)}
                        className="text-3xl" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
