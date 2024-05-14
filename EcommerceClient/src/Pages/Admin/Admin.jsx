import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

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
            <div className="">
                <Outlet/>
            </div>
        </>
    )
}

export default Admin