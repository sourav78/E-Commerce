import React from 'react'
import AllUsers from '../../components/Admin/Users/AllUsers'

const AdminAllUsers = () => {
    return (
        <>
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="">
                    <div className=" bg-blue-500 rounded flex items-center">
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Name</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Email</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Mobile</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4 ">
                            <p className='text-lg font-semibold text-white'>Type</p>
                        </div>
                    </div>
                    <div className="">
                        <AllUsers/>
                    </div>
                </div>
            </div>   
        </>
    )
}

export default AdminAllUsers