import React, { useEffect, useState } from 'react'
import { FcDeployment } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { FcMoneyTransfer  } from "react-icons/fc";
import axios from 'axios'

const StoreOverview = () => {
    
    const [overview, setOverview] = useState({})

    const fetchOverview = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/store-overview`)

            const {data} = response

            data.success && setOverview(data.data)
        } catch (error) {   
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOverview()
    }, [])

    return (
        <>
            <div className="p-4 border-gray-300 rounded">
                <div className="">
                    <p className='text-xl font-semibold'>Store Overview</p>
                </div>
                <div className="mt-4 flex flex-wrap items-stretch xl:gap-16 lg:gap-12 sm:gap-8 gap-6">
                    <div className="py-2 px-4 flex-1 border border-gray-300 rounded">
                        <div className="flex gap-4 items-center justify-between">
                            <div className="">
                                <h3 className='text-lg font-semibold'>Total Products</h3>
                                <p className='mt-2 text-3xl font-bold'>{overview.totalProducts}</p>
                            </div>
                            <div className="">
                                <FcDeployment className='text-6xl' />
                            </div>
                        </div>
                    </div>
                    <div className="py-2 px-4 flex-1 border border-gray-300 rounded">
                        <div className="flex gap-4 items-center justify-between">
                            <div className="">
                                <h3 className='text-lg font-semibold'>Total Users</h3>
                                <p className='mt-2 text-3xl font-bold'>{overview.totalUsers}</p>
                            </div>
                            <div className="">
                                <FcManager className='text-6xl' />
                            </div>
                        </div>
                    </div>
                    <div className="py-2 px-4 flex-1 border border-gray-300 rounded">
                        <div className="flex gap-4 items-center justify-between">
                            <div className="">
                                <h3 className='text-lg font-semibold'>Total Orders</h3>
                                <p className='mt-2 text-3xl font-bold'>{overview.totalOrders}</p>
                            </div>
                            <div className="">
                                <FcShipped className='text-6xl' />
                            </div>
                        </div>
                    </div>
                    <div className="py-2 px-4 flex-1 border border-gray-300 rounded">
                        <div className="flex gap-4 items-center justify-between">
                            <div className="">
                                <h3 className='text-lg font-semibold'>Total Amount</h3>
                                <p className='mt-2 text-3xl font-bold'>₹{overview.totalAmount}</p>
                            </div>
                            <div className="">
                                <FcMoneyTransfer className='text-6xl' />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default StoreOverview