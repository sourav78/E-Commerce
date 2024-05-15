import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import { RiSkipLeftLine } from "react-icons/ri";

const Admin = () => {

    const location = useLocation()

    const isAuthenticate = useSelector(state => state.ecom.isAuthenticate)
    const user = useSelector(state => state.ecom.user)

    
    const [responsiveClose, setResponsiveClose] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticate === false ){
            navigate('../')
        }else{
            if(user.isAdmin === 'USER'){
                navigate('../')
            }
        }
    }, [isAuthenticate, user])

    return (
        <>  
            <div className=" w-full min-h-screen bg-slate-200 flex">
                <AdminSideBar responsiveClose={responsiveClose} setResponsiveClose={setResponsiveClose}/>
                <div className="flex-1 sm:p-2 p-1 max-h-screen overflow-y-scroll flex flex-col">
                    <div className="p-3 rounded-md bg-white mb-2 flex items-center justify-between shadow-md">
                        <div className="flex justify-start gap-2 items-center">
                            <div className="sm:hidden block text-white">
                                <RiSkipLeftLine 
                                    onClick={() => setResponsiveClose(true)}
                                    className={`rotate-180 text-3xl p-[2px] bg-blue-700 hover:bg-blue-800 rounded-full cursor-pointer transition-all`} />
                            </div>
                            <p className='font-semibold'>{location.pathname}</p>
                        </div>
                        <div className="">
                            <div 
                                onClick={() => navigate('../profile')}
                                className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
                                <img className='object-contain' src={user.imageUrl} alt="" />
                            </div>
                        </div>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Admin