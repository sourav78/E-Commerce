import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../utils/constraints'
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
                const response = await axios.get(`${BASE_URL}/product/get-wishlist-product?userId=${user._id}`)
    
                const {data} = response
    
                data.success && setWishlistProducts(data.data)
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
            <div className="border border-gray-300">
                {
                    wishlistProducts.map(product => (
                        <SingleWishlist key={product} productId={product} userId={userId} setReloadWishlist={setReloadWishlist}/>
                    ))
                }
                
            </div>    
        </>
    )
}
