import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../../utils/constraints'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleOrders from './SingleOrders'

const AllOrders = () => {

    const user = useSelector(state => state.ecom.user)

    const [userId, setUserId] = useState('')

    const [orderdProduct, setOrderdProduct] = useState([])

    const [reloadOrder, setReloadOrder] = useState(false)

    useEffect(() => {
        async function getOrderProducts(){
            try {
                const response = await axios.get(`${BASE_URL}/product/get-order-product?userId=${user._id}`)
    
                const {data} = response
    
                if (data.success) {
                    // Sort orders by order date in descending order (latest first)
                    const sortedOrders = data.data.orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                    setOrderdProduct(sortedOrders);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setUserId(user._id)
        getOrderProducts()
    }, [user, reloadOrder])

    return (
        <>
            {
                orderdProduct && (
                    <div className="border border-gray-300 last:border-b-0">
                        {
                            orderdProduct.map(order => (
                                order.products.map(product => (
                                    <SingleOrders product={product} userId={userId} setReloadOrder={setReloadOrder}/>
                                ))
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default AllOrders