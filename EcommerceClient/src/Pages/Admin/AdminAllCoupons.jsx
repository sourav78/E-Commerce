import React from 'react'
import AllCoupons from '../../components/Admin/Coupons/AllCoupons'

const AdminAllCoupons = () => {
    return (
      <>
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="">
                    <div className=" bg-blue-500 rounded flex items-center last:border-r-0">
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Code</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Type</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Max Uses</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4 ">
                            <p className='text-lg font-semibold text-white'>Active</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <AllCoupons/>
                </div>
            </div> 
      </>
    )
}

export default AdminAllCoupons