import React, { useEffect, useState } from 'react'
import SingleOrder from './SingleOrder'
import axios from 'axios'

const AllOrders = () => {

    const [orders, setOrders] = useState([])


    useEffect(() => {
        async function fetchAllCoupons(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-all-orders`)

                const {data} = response

                data.success && setOrders(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllCoupons()
    }, [])


    return (
        <>
            <div className="mt-2">

                {
                    orders && orders.map(order => (
                        order.orders.map(product => (
                            product.products.map(prod => (
                                <SingleOrder key={prod._id} product={prod} orderId={product._id} allOrderId={order._id} />
                            ))
                        ))
                    ))
                }
            </div>
        </>
    )
}

export default AllOrders