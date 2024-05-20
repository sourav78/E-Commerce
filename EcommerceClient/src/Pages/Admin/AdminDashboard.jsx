import React from 'react'
import StoreOverview from '../../components/Admin/Dashboard/StoreOverview'

const AdminDashboard = () => {
    return (
        <div className='bg-white flex-1 rounded-md shadow-md p-2'>
            <div className="">
                <StoreOverview/>
            </div>
        </div>
    )
}

export default AdminDashboard