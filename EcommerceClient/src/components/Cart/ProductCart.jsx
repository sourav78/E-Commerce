import React, { useEffect, useState } from 'react'
import CartProduct from './CartProduct'
import {useDispatch, useSelector} from 'react-redux'
import {BASE_URL} from '../../utils/constraints.js'
import axios from 'axios'
import EmptyCart from './EmptyCart.jsx'
import { toggleCartTrigger } from '../../redux_slicer/ProductSlicer.js'

const ProductCart = ({onCartEmptyChange, setReloadOnQuantityUpdate, totalOrderPrice}) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.ecom.user)

    const [allCartProduct, setAllCartProduct] = useState([])

    const [reloadTrigger, setReloadTrigger] = useState(false)

    async function fetchCartProductData(){
        try {
            const response = await axios.get(`${BASE_URL}/product/get-cart-product?userId=${user._id}`)
            const {data} = response

            data.success && console.log(data.data);
            data.success && setAllCartProduct(data.data)
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    useEffect(()=> {
        fetchCartProductData()
    },[user, reloadTrigger])


    if(allCartProduct.length === 0){
        onCartEmptyChange(true)
        dispatch(toggleCartTrigger())
        return <EmptyCart/>
    }else{
        onCartEmptyChange(false)
    }

    return (
        <>
            <div className="bg-white pt-4 shadow-xl relative">
                <div className=" border-b pb-4 px-4">
                    <p className='sm:text-xl text-lg font-semibold'>Product In Your Cart</p>
                </div>
                <div className="mt-4 px-4">
                    {
                        allCartProduct.map(product => (
                            <CartProduct key={product.productId} product={product} setReloadOnQuantityUpdate={setReloadOnQuantityUpdate} setReloadTrigger={setReloadTrigger}/>
                        ))
                    }
                </div>
                <div style={{ boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.25)' }} className=" py-4 sm:px-8 px-4 shadow-md sticky bottom-0 bg-white">
                    <div className=" flex justify-between items-center">
                        <p className='text-3xl font-semibold'>₹{totalOrderPrice+100}</p>
                        <button className='sm:px-16 px-12 py-3 border border-black text-xl font-semibold bg-[#00ed64]'>Place Order</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCart