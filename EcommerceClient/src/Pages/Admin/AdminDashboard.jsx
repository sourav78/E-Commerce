import React from 'react'
import StoreOverview from '../../components/Admin/Dashboard/StoreOverview'
import TransactionLineChart from '../../components/Admin/Dashboard/TransactionLineChart'
import OrderStatusPie from '../../components/Admin/Dashboard/OrderStatusPie'
import StockStatusPie from '../../components/Admin/Dashboard/StockStatusPie'
import UnavailableStock from '../../components/Admin/Dashboard/UnavailableStock'

const AdminDashboard = () => {
    return (
        <div className='bg-white flex-1 rounded-md shadow-md p-2'>
            <div className="">
                <StoreOverview/>
                <div className="mt-8 lg:flex-row flex-col flex gap-4">
                    <div className="p-2 border border-gray-300 rounded lg:w-[60%] w-full">
                        <TransactionLineChart/>
                    </div>
                    <div className="p-2 min-h-[300px] border border-gray-300 rounded lg:w-[40%] w-full">
                        <OrderStatusPie/>
                    </div>
                </div>
                <div className="mt-12 lg:flex-row flex-col flex gap-4">
                    <div className="p-2 min-h-[300px] border border-gray-300 rounded lg:w-[40%] w-full">
                        <StockStatusPie/>
                    </div>
                    <div className="p-2 lg:h-[450px] border border-gray-300 rounded lg:w-[60%] w-full">
                        <UnavailableStock/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard