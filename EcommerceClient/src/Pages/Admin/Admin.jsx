import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSideBar from '../../components/Admin/AdminSideBar'

const Admin = () => {

    const isAuthenticate = useSelector(state => state.ecom.isAuthenticate)
    const user = useSelector(state => state.ecom.user)

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
            <div className=" w-full min-h-screen bg-slate-100 flex">
                <AdminSideBar/>
                <div className="flex-1 p-3 max-h-screen overflow-y-scroll">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Admin