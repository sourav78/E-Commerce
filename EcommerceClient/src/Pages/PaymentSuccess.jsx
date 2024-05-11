import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import paymentsuccess from "../assets/success.png"
import {Link} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from "../utils/constraints"

const PaymentSuccess = () => {

    const navigate = useNavigate()

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const success = queryParams.get('success');

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"))

    const [isOrderSuccessfull, setIsOrderSuccessfull] = useState(false)

    async function createOrder(){
        try {
            const response = await axios.post(`${BASE_URL}/product/create-order`, {
                userId: orderDetails.userDetails.userId,
                products: orderDetails.products,
                totalAmount: orderDetails.totalAmount,
                address: orderDetails.address
            })

            if(orderDetails.coupons.length){
                console.log("coupons");
                await axios.post(`${BASE_URL}/product/claim-coupon`, {
                    couponCodes: orderDetails.coupons,
                    userId: orderDetails.userDetails.userId
                })
            }
            
            await axios.post(`${BASE_URL}/product/update-product-stock`, {
                productsToUpdate: orderDetails.products
            })

            const {data} = response

            data.success && setIsOrderSuccessfull(true)
            data.success && localStorage.removeItem("orderDetails")
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {

        if(success){
            if(orderDetails){
                createOrder()
            }else{
                navigate("../")
            }
        }else{
            navigate("../")
        }

    }, [])

    return (
        <>
            <div className="">
                <div className="mt-8">
                    {
                        isOrderSuccessfull ? (
                            <>
                                <div className="lg:w-[5%] sm:w-[10%] w-[15%] mx-auto">
                                    <img src={paymentsuccess} alt="" />
                                </div>
                                <p className=" text-2xl text-[#229a54] text-center mt-4">Payment Successfull</p>
                                <div className="mt-8 flex justify-center">
                                    <Link 
                                        to='/product'
                                        className=' text-lg px-8 py-3 font-semibold border-2 border-black bg-[#00ed64]'
                                    >Shop Now</Link>
                                </div>
                            </>
                        ) : (
                            <div className="w-44 bg-white py-2 px-4 text-lg rounded-md shadow-md m-auto">
                                Loading...
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess