import React from 'react'

const PriceDetail = () => {
    return (
        <>
            <div className="bg-white shadow-xl sticky top-4">
                <div className=" p-4 border-b">
                    <p className='font-semibold text-gray-600'>PRICE DETAILS</p>
                </div>
                <div className=" p-4">
                    <div className="border-b pb-4 border-dashed">
                        <div className="flex justify-between items-center">
                            <p className='font-semibold text-gray-700'>Price</p>
                            <p className='font-semibold text-lg text-gray-700'>₹34,668</p>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <p className='font-semibold text-gray-700'>Discount</p>
                            <p className='font-semibold text-lg text-green-600'>₹1234</p>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <p className='font-semibold text-gray-700'>Delivery Charges</p>
                            <p className='font-semibold text-lg text-gray-700'>₹332</p>
                        </div>
                    </div>
                    <div className="border-b py-4 border-dashed">
                        <div className="">
                            <p className='font-semibold text-gray-700 mb-2'>COUPONS</p>
                            <div className="flex justify-between items-center gap-2">
                                <input className='outline-none border border-black focus:border-[#00ed64] px-2 py-1 flex-1' type="text" />
                                <button className='px-4 py-1 border border-black bg-[#00ed64]'>Apply</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-b py-4 border-dashed">
                        <div className="my-2 flex justify-between items-center">
                            <p className='text-lg font-semibold'>Total Amount</p>
                            <p className='text-lg font-semibold'>₹12,231</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className='text-green-600 font-semibold'>You will save ₹22,437 on this order</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PriceDetail