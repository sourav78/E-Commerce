import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BASE_URL} from '../../utils/constraints.js'
import axios from 'axios'
import { notification } from 'antd';
import { updateCoupons, updateProducts } from '../../redux_slicer/OrderSlicer.js';

const PriceDetail = ({reloadOnQuantityUpdate, setTotalOrderPrice}) => {

    const [api, contextHolder] = notification.useNotification();

    const dispatch = useDispatch()

    const user = useSelector(state => state.ecom.user)

    const [couponValue, setCouponValue] = useState('')

    const [totalPrice, setTotalPrice] = useState(0)
    const [actualPrice, setActualPrice] = useState(0)
    const [priceDeatils, setPriceDeatils] = useState([])

    const [appliedCoupons, setAppliedCoupons] = useState([])

    const [couponDiscount, setCouponDiscount] = useState(0)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

    useEffect(() => {
        async function getPriceDeatils(){
            try {
                const response = await axios.post(`${BASE_URL}/product/get-price-deatils`, {
                    userId: user._id
                })
                const {data} = response
    
                data.success && console.log(data.data);
                data.success && setPriceDeatils(data.data)
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        getPriceDeatils()
    }, [user, reloadOnQuantityUpdate])

    useEffect(() => {
        const totalPriceSum = priceDeatils.reduce((acc, cur) => acc+cur.totalPrice, 0)
        const actualTotalPriceSum = priceDeatils.reduce((acc, cur) => acc+cur.totalAcutualPrice, 0)
        setTotalPrice(totalPriceSum)
        setTotalOrderPrice(totalPriceSum)
        setActualPrice(actualTotalPriceSum)
        const data = priceDeatils.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
            totalPrice: product.totalPrice
        }));
        dispatch(updateProducts(data))
        
    }, [priceDeatils])
    
    useEffect(() => {
        if(!appliedCoupons.includes(couponValue)){
            setTotalPrice(couponDiscount)
            setTotalOrderPrice(couponDiscount)
            setAppliedCoupons(prev => [...prev, couponValue])
            couponValue && openNotificationWithIcon('success', 'Coupon apply successfully')
            dispatch(updateCoupons(couponValue))
            setCouponValue('')
        }else{
            console.log("applied");
            openNotificationWithIcon('error', 'This coupon is already applied.')
        }
    }, [couponDiscount])

    const handleCouponApply = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/product/apply-coupon`, {
                couponCode: couponValue,
                userId: user._id,
                totalAmount: totalPrice
            })

            const {data} = response

            data.success && console.log(data.data);
            data.success && setCouponDiscount(Math.ceil(data.data))
        } catch (error) {
            console.log(error.response.data.msg);
            openNotificationWithIcon('error', error.response.data.msg)
        }
    }

    return (
        <> 
            {contextHolder}
            <div className="bg-white shadow-xl sticky top-4">
                <div className=" p-4 border-b">
                    <p className='font-semibold text-gray-600'>PRICE DETAILS</p>
                </div>
                <div className=" p-4">
                    <div className="border-b border-gray-300 pb-4 border-dashed">
                        <div className="flex justify-between items-center">
                            <p className='font-semibold text-gray-700'>Price ({priceDeatils.length} items)</p>
                            <p className='font-semibold text-lg text-gray-700'>₹{actualPrice}</p>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <p className='font-semibold text-gray-700'>Discount</p>
                            <p className='font-semibold text-lg text-green-600'>-₹{actualPrice - totalPrice}</p>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <p className='font-semibold text-gray-700'>Delivery Charges</p>
                            <p className='font-semibold text-lg text-gray-700'>₹100</p>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 py-4 border-dashed">
                        <div className="">
                            <p className='font-semibold text-gray-700 mb-2'>COUPONS</p>
                            <div className="flex justify-between items-center gap-2">
                                <input 
                                    value={couponValue}
                                    onChange={(e) => setCouponValue(e.target.value)}
                                    className='outline-none block border border-black focus:border-[#00ed64] px-2 py-1 w-full' type="text" />
                                <button 
                                    onClick={handleCouponApply}
                                    className='px-4 py-1 border border-black bg-[#00ed64]'>Apply</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 py-4 border-dashed">
                        <div className="my-2 flex justify-between items-center">
                            <p className='text-lg font-semibold'>Total Amount</p>
                            <p className='text-lg font-semibold'>₹{totalPrice}</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className='text-green-600 font-semibold'>You will save ₹{actualPrice - totalPrice} on this order</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PriceDetail