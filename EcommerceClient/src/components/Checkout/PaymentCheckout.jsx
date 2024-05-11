import React from 'react'

const PaymentCheckout = ({isAddressSet, orderDetails}) => {

    const handleMakePayment = () => {
        console.log(orderDetails);
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