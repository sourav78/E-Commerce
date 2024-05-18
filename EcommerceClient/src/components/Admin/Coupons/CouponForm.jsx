import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { notification } from 'antd';
import axios from 'axios';

const CouponForm = ({coupon}) => {
    
    const [api, contextHolder] = notification.useNotification();

    const [code, setCode] = useState(coupon?.code || '')
    const [discountType, setDiscountType] = useState(coupon?.discountType || 'percentage')
    const [discountAmount, setDiscountAmount] = useState(coupon?.discountAmount || 0)
    const [minOrderAmount, setMinOrderAmount] = useState(coupon?.minOrderAmount || 0)
    const [maxUses, setMaxUses] = useState(coupon?.minOrderAmount || 0)
    const [isActive, setIsActive] = useState(coupon?.isActive !== undefined ? coupon.isActive : true)

    const [onPromiseState, setOnPromiseState] = useState(false)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight'
        });
    };

    const createCoupon = async () => {
        setOnPromiseState(true)
        console.log(discountAmount);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/create-coupon`, {
                code,
                discountType,
                discountAmount: Number(discountAmount),
                minOrderAmount: Number(minOrderAmount),
                maxUses: Number(maxUses),
                isActive
            })
    
            const {data} = response

            data.success && openNotificationWithIcon('success', data.data)
            data.success && setOnPromiseState(false)
        } catch (error) {
            openNotificationWithIcon('error', error.response.data.msg)
            setOnPromiseState(false)
        }
    }

    const editCoupon = async () => {
        setOnPromiseState(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/edit-coupon`, {
                id: coupon._id,
                code,
                discountType,
                discountAmount: Number(discountAmount),
                minOrderAmount: Number(minOrderAmount),
                maxUses: Number(maxUses),
                isActive
            })
    
            const {data} = response

            data.success && openNotificationWithIcon('success', data.data)
            data.success && setOnPromiseState(false)
        } catch (error) {
            openNotificationWithIcon('error', error.response.data.msg)
            setOnPromiseState(false)
        }
    }

    const handleCreateCoupon = async () => {
        if(coupon){
            editCoupon()
        }else{
            createCoupon()
        }
    }


    return (
        <>
            {contextHolder}
            <div className=" mt-8 xl:w-[50%] lg:w-[70%] sm:w-[90%] w-full border-gray-500 rounded px-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className=" w-full">
                        <label className='font-semibold mb-2'>Coupon Code:</label>
                        <TextField
                            className="w-full"
                            required
                            id="name"
                            size='small'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <div className=" w-full flex gap-4">
                        <label className='font-semibold mb-2'>Discount Type:</label>
                        <div className=" flex gap-8 items-start">
                            <button
                                onClick={() => setDiscountType('percentage')}
                                className={`sm:px-6 px-2 sm:py-2 py-1 ${discountType === 'percentage' ? 'bg-blue-700 outline-4' : 'bg-blue-500 outline-2'}  rounded text-white outline outline-blue-600 `}
                            >Percentage</button>
                            <button
                                onClick={() => setDiscountType('fixed')}
                                className={`sm:px-6 px-2 sm:py-2 py-1 ${discountType === 'fixed' ? 'bg-blue-700 outline-4' : 'bg-blue-500 outline-2'}  rounded text-white outline outline-blue-600 `}
                            >Fixed</button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/2 w-full">
                        <label className='font-semibold mb-2'>Discount Amount:</label>
                        <TextField
                            className="w-full"
                            required
                            id="name"
                            size='small'
                            type='number'
                            value={discountAmount}
                            onChange={(e) => setDiscountAmount(e.target.value)}
                        />
                    </div>
                    <div className="sm:w-1/2 w-full">
                        <label className='font-semibold mb-2'>Minimum Order:</label>
                        <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            size='small'
                            type='number'
                            value={minOrderAmount}
                            onChange={(e) => setMinOrderAmount(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="sm:w-1/2 w-full">
                        <label className='font-semibold mb-2'>Max Uses:</label>
                        <TextField
                            className="w-full"
                            required
                            id="name"
                            size='small'
                            type='number'
                            value={maxUses}
                            onChange={(e) => setMaxUses(e.target.value)}
                        />
                    </div>
                    <div className="sm:w-1/2 w-full">
                        <label className='font-semibold mb-2'>Active Coupon:</label>
                        <Switch
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <span className={`font-semibold ${isActive ? "text-blue-500" : "text-red-500"}`}>{isActive ? "Activate" : "Not Active"}</span>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={handleCreateCoupon}
                        disabled={onPromiseState}
                        className={`text-lg font-semibold px-12 py-2 rounded ${onPromiseState ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500'} text-white`}>{coupon ? 'EDIT' : 'CREATE'}</button>
                </div>
            </div>   
        </>
    )
}

export default CouponForm