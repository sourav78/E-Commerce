import React from 'react'
import CartProduct from './CartProduct'

const ProductCart = () => {
    return (
        <>
            <div className="bg-white pt-4 shadow-xl relative">
                <div className=" border-b pb-4 px-4">
                    <p className='sm:text-xl text-lg font-semibold'>Product In Your Cart</p>
                </div>
                <div className="mt-4 px-4">
                    <CartProduct/>
                    <CartProduct/>
                    <CartProduct/>
                    <CartProduct/>
                </div>
                <div style={{ boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.25)' }} className=" py-4 sm:px-8 px-4 shadow-md sticky bottom-0 bg-white">
                    <div className=" flex justify-between items-center">
                        <p className='text-3xl font-semibold'>₹4000</p>
                        <button className='sm:px-16 px-12 py-3 border border-black text-xl font-semibold bg-[#00ed64]'>Place Order</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCart