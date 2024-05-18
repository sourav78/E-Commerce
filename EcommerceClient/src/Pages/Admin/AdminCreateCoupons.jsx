import React from 'react'
import CouponForm from '../../components/Admin/Coupons/CouponForm'

const AdminCreateCoupons = () => {
    return (
        <>
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="flex justify-start items-center w-full p-4 flex-col">
                    <div className="">
                        <h1 className='text-3xl text-center sm:text-4xl font-bold'>ADD NEW COUPONS</h1>
                    </div>
                    <CouponForm/>
                </div>
            </div>
        </>
    )
}

export default AdminCreateCoupons