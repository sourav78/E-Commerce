import React from 'react'
import AllOrders from '../../components/Admin/Orders/AllOrders'

const AdminOrders = () => {
    return (
        <>
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="">
                    <div className=" bg-blue-500 rounded flex items-center">
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Product</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Price</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Quantity</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4 ">
                            <p className='text-lg font-semibold text-white'>Status</p>
                        </div>
                    </div>
                    <div className="">
                        <AllOrders/>
                    </div>
                </div>
            </div>   
        </>
    )
}

export default AdminOrders