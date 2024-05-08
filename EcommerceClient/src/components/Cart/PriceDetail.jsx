import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {BASE_URL} from '../../utils/constraints.js'
import axios from 'axios'

const PriceDetail = ({reloadOnQuantityUpdate, setTotalOrderPrice}) => {

    const user = useSelector(state => state.ecom.user)

    const [totalPrice, setTotalPrice] = useState(0)
    const [actualPrice, setActualPrice] = useState(0)
    const [priceDeatils, setPriceDeatils] = useState([])

    useEffect(() => {
        async function getPriceDeatils(){
            try {
                const response = await axios.get(`${BASE_URL}/product/get-price-deatils?userId=${user._id}`)
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
    }, [priceDeatils])

    return (
        <>
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
                                <input className='outline-none border border-black focus:border-[#00ed64] px-2 py-1 flex-1' type="text" />
                                <button className='px-4 py-1 border border-black bg-[#00ed64]'>Apply</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 py-4 border-dashed">
                        <div className="my-2 flex justify-between items-center">
                            <p className='text-lg font-semibold'>Total Amount</p>
                            <p className='text-lg font-semibold'>₹{totalPrice+100}</p>
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