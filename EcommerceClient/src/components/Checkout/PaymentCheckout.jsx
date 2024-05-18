import React, {useState} from 'react'
import axios from "axios";

const PaymentCheckout = ({isAddressSet, orderDetails}) => {


    const handleMakePayment = async () => {

        localStorage.setItem("orderDetails", JSON.stringify(orderDetails))

        const {
            data: { key },
        } = await axios.get(`${import.meta.env.VITE_API_URL}/api/getkey`);

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout`, {
            amount: orderDetails.totalAmount,
            receipt: orderDetails.userDetails.userId
        });

        const options = {
            key: key,
            amount: data.amount,
            currency: "INR",
            name: "Sourav r sahoo",
            description: "S78 Store",
            image: "https://avatars.githubusercontent.com/u/90958544?v=4",
            order_id: data.id,
            callback_url: `${import.meta.env.VITE_API_URL}/api/paymentverification`,
            prefill: {
              name: orderDetails.userDetails.userName,
              email: orderDetails.userDetails.email,
              contact: orderDetails.userDetails.mobile,
            },
            notes: {
              address: `Name:- ${orderDetails.address.name}, ${orderDetails.address.area}, ${orderDetails.address.locality}, ${orderDetails.address.city}, ${orderDetails.address.state} - ${orderDetails.address.postalCode}, ${orderDetails.address.mobile}`,
            },
            theme: {
              color: "#1C1C1C",
            },
        };

        var razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <>
            <div className="mt-4 bg-white rounded overflow-y-hidden shadow-md">
                <div className={`${!isAddressSet ? "bg-white" : "bg-[#00ed64]"} p-4 flex items-start justify-between`}>
                    <div className="flex items-start gap-2">
                        <p className='w-6 h-6 bg-gray-200 rounded-sm text-green-600 text-center'>3</p>
                        <div className="">
                            <p className={`font-semibold ${!isAddressSet ? "text-gray-500" : "text-black"}`}>PAYMENT</p>
                        </div>
                    </div>
                </div>
                {
                    isAddressSet && (
                        <div className="px-4 py-4">
                            <p className='text-lg'>Make payment with razorpay</p>
                            <div className="text-sm mt-2 flex gap-4 items-start">
                                <p className='font-semibold'>Payment options:-</p>
                                <ol className='list-decimal'>
                                    <li>Credit/Debit card</li>
                                    <li>UPI / QR</li>
                                    <li>Net banking</li>
                                    <li>Wallet</li>
                                </ol>
                            </div>
                            <div className="mt-2">
                                <button
                                    onClick={handleMakePayment}
                                    className='sm:px-12 px-8 py-3 border border-black font-semibold bg-[#00ed64]'
                                >MAKE PAYMENT</button>
                            </div>
                        </div>
                    )
                }
            </div>    
        </>
    )
}

export default PaymentCheckout