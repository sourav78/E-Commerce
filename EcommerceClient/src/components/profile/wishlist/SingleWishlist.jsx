import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SingleWishlist = ({productId, userId, setReloadWishlist}) => {

    const [productData, setProductData] = useState({})

    useEffect(() => {
        async function getProduct(){
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/get-product-details`, {
                    productId
                })
                const {data} = response
    
                data.success && setProductData(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        getProduct()
    }, [])

    const handleRemoveWishlistProduct = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/wishlist-product`, {
                productId: productData._id,
                userId
            })

            const {data} = response
            data.success && setReloadWishlist(prev => !prev)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                productData && (
                    <div className="w-full border-b border-gray-300 sm:p-6 p-2">
                        <div className="">
                            <div className="flex sm:flex-row flex-col gap-8">
                                <div className="m-auto mt-4 sm:mt-0 xl:w-[12%] lg:w-[18%] sm:w-[25%] w-[30%]">
                                    <img className='w-full h-full max-h-24 sm:min-h-4 object-contain' src={productData.image_url} alt="" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <Link to={`../../details/${productData._id}`} className='text-2xl font-semibold'>{productData.name}</Link>
                                        <button 
                                            onClick={handleRemoveWishlistProduct}
                                            className='px-2 py-1 border border-gray-400 rounded-md hover:border-red-500 hover:bg-red-500 hover:text-white transition-all'>Remove</button>
                                    </div>
                                    <p className=' text-lg text-gray-500 font-semibold'>{productData.brand}</p>
                                    <div className="flex gap-3 items-end">
                                        <p className="text-xl font-bold">₹{productData.price}</p>
                                        <p className=" font-normal text-gray-700 line-through">₹{Math.round(Number(productData.price)/(1-(Number(productData.discount)/100)))}</p>
                                        <p className=" text-green-600 font-semibold">{productData.discount}% off</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                )
            }   
        </>
    )
}

export default SingleWishlist