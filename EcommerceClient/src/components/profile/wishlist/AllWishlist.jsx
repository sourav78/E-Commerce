import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleWishlist from './SingleWishlist'

export const AllWishlist = () => {

    const user = useSelector(state => state.ecom.user)

    const [userId, setUserId] = useState('')

    const [wishlistProducts, setWishlistProducts] = useState([])

    const [reloadWishlist, setReloadWishlist] = useState(false)

    useEffect(() => {
        async function getWishlistProducts(){
            console.log(user._id);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/get-wishlist-product?userId=${user._id}`)
    
                const {data} = response
    
                data.success && setWishlistProducts(data.data.reverse())
                data.success && console.log(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        setUserId(user._id)
        getWishlistProducts()
    }, [user, reloadWishlist])

    if(!wishlistProducts){
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="border border-gray-300 last:border-b-0">
                {
                    wishlistProducts.map(product => (
                        <SingleWishlist key={product} productId={product} userId={userId} setReloadWishlist={setReloadWishlist}/>
                    ))
                }
                
            </div>    
        </>
    )
}
