import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddressCheckout from '../components/Checkout/AddressCheckout'
import PaymentCheckout from '../components/Checkout/PaymentCheckout'

const Checkout = () => {

    const navigate = useNavigate()

    const orderData = useSelector(state => state.order)

    const [orderDetails, setOrderDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [isAddressSet, setIsAddressSet] = useState(false)

    useEffect(() => {

        if(orderData){
            if(orderData.initializeOrder){
                setOrderDetails(orderData)
                setIsLoading(false)
            }else{
                navigate('../cart')
            }
        }

    }, [orderData])

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="relative border-black my-4 lg:w-4/5 sm:w-11/12 w-full px-2 m-auto flex sm:flex-row flex-col gap-4">
                <div className=" border-black flex-1">
                    <div className="">
                        <div className="p-4 bg-white rounded shadow-md">
                            <div className="flex items-start gap-2">
                                <p className='w-6 h-6 bg-gray-200 rounded-sm text-green-600 text-center'>1</p>
                                <div className="">
                                    <p className='font-semibold text-gray-500'>LOGIN</p>
                                    <p className='text-sm font-semibold'>{orderDetails.userDetails.userName} - {orderDetails.userDetails.email}</p>
                                </div>
                            </div>
                        </div>
                        <AddressCheckout userId={orderDetails.userDetails.userId} selectedAddress={orderDetails.address} isAddressSet={isAddressSet} setIsAddressSet={setIsAddressSet}/>
                        <PaymentCheckout isAddressSet={isAddressSet} orderDetails={orderDetails}/>
                    </div>
                </div>
                <div className=" border-black sm:w-[32%] w-full relative">
                    <div className="bg-white shadow-xl sticky top-4">
                        <div className=" p-4 border-b">
                            <p className='font-semibold text-gray-600'>PRICE DETAILS</p>
                        </div>
                        <div className=" p-4">
                            <div className="border-b border-gray-300 pb-4 border-dashed">
                                <div className="flex justify-between items-center">
                                    <p className='font-semibold text-gray-700'>Price ({orderDetails.products.length} items)</p>
                                    <p className='font-semibold text-lg text-gray-700'>₹{orderDetails.totalAmount - 100}</p>
                                </div>
                                <div className="mt-3 flex justify-between items-center">
                                    <p className='font-semibold text-gray-700'>Delivery Charges</p>
                                    <p className='font-semibold text-lg text-gray-700'>₹100</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="my-2 flex justify-between items-center">
                                    <p className='text-lg font-semibold'>Total Payble</p>
                                    <p className='text-lg font-semibold'>₹{orderDetails.totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout