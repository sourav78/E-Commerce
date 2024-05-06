import React, {useState} from 'react'

const CartProduct = () => {

    const [quantity, setQuantity] = useState(0)

    const handleCounterIncrease = () => {
        if(quantity < 10){
            setQuantity(prev => prev+1)
        }
    }

    const handleCounterDecrease = () => {
        if(quantity > 1){
            setQuantity(prev => prev-1)
        }
    }

    return (
        <>
            <div className="w-full border-b pb-4 mt-4">
                <div className="flex gap-2 sm:flex-row flex-col items-center">
                    <div className="sm:w-1/4 w-full flex flex-col items-center">
                        <div className="sm:w-[90%] w-2/4">
                            <img className='m-auto h-full max-h-40 sm:min-h-4max-h-40 object-contain' src="https://m.media-amazon.com/images/I/611xYqDdfRL._SY355_.jpg" alt="" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handleCounterDecrease}
                                    className='border border-gray-400 w-6 h-6 rounded grid place-content-center font-semibold hover:bg-gray-200 transition-all'>-</button>
                                <p className='text-lg w-10 h-6 border border-gray-400 grid place-content-center'>{quantity}</p>
                                <button 
                                    onClick={handleCounterIncrease}
                                    className='border border-gray-400 w-6 h-6 rounded grid place-content-center font-semibold hover:bg-gray-200 transition-all'>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 sm:mt-0 mt-4">
                        <div className="w-full flex flex-col justify-between">
                            <p className=''>HP Laptop 15s, AMD Ryzen 5 5500U, 15.6-inch (39.6 cm), FHD, 8GB DDR4, 512GB SSD, AMD Radeon Graphics, Thin & Light, Dual Speakers (Win 11, MSO 2021, Silver, 1.69 kg),</p>
                            <p className='text-gray-500 mt-2 font-semibold'>Brand</p>
                            <div className="mt-2 flex gap-3 items-end">
                                <p className="text-2xl font-bold">₹4000</p>
                                <p className=" font-normal text-gray-700 line-through">₹5422</p>
                                <p className=" text-green-600 font-semibold">23% off</p>
                            </div>
                            <div className="mt-2">
                                <button className='font-semibold hover:text-red-500 transition-all'>REMOVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProduct