import React from 'react'
import UserForm from '../../components/Admin/Users/UserForm'

const AdminCreateUsers = () => {
    return (
        <>
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="flex justify-start items-center w-full p-4 flex-col">
                    <div className="">
                        <h1 className='text-3xl text-center sm:text-4xl font-bold'>ADD NEW USER</h1>
                    </div>
                    <UserForm/>
                </div>
            </div>
        </>
    )
}

export default AdminCreateUsers