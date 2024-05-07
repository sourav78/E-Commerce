import React from 'react'
import emptyCart from '../../assets/empty-cart.png'
import {Link} from 'react-router-dom'

const EmptyCart = () => {
    return (
        <>
            <div className="w-full bg-white p-8 rounded">
                <div className="flex items-center flex-col text-center">
                    <img className='w-52' src={emptyCart} alt="" />
                    <div className="mt-4 ">
                        <p className='text-lg text-black'>Your cart is empty!</p>
                        <div className="mt-8">
                            <Link 
                                to='/product'
                                className=' text-lg px-8 py-3 font-semibold border-2 border-black bg-[#00ed64]'
                            >Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmptyCart