import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { notification } from 'antd';

const AdminOrdersDetails = () => {

    
    const [api, contextHolder] = notification.useNotification();

    const {allOrderId} = useParams()

    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');

    const [mainOrder, setMainOrder] = useState({})

    const [singleOrders, setSingleOrders] = useState({})

    const [orderedProduct, setOrderedProduct] = useState({})

    const [productData, setProductData] = useState({})

    const [status, setStatus] = React.useState('');

    const [reloadOrder, setReloadOrder] = useState(false)


    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

    const handleChange = (event) => {
        console.log(event.target.value);
        setStatus(event.target.value);
    };

    useEffect(() => {
        async function getOrders(){

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-single-orders?orderId=${allOrderId}`)
    
                const {data} = response
                if(data.success){
                    setMainOrder(data.data)
                    data.data.orders.map(order => {
                        if(order._id === orderId){
                            console.log(order);
                            setSingleOrders(order)
                        }
                    })
                }
            } catch (error) {
                console.log(error);
            }
            
        }

        getOrders()
    }, [reloadOrder])

    useEffect(() => {
        if(singleOrders.hasOwnProperty('totalAmount')){
            singleOrders.products.map(product => {
                if(product.productId === productId){
                    setOrderedProduct(product)
                    setStatus(product.status)
                }
            })
        }
    }, [singleOrders])

    useEffect(() => {
        async function getProduct(){

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/get-product-details`, {
                    productId
                })
    
                const {data} = response
                data.success && setProductData(data.data)
            } catch (error) {
                console.log(error.response.data.msg);
            }
            
        }

        getProduct()
    }, [])

    const handleUpdateStatus = async () => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/update-order-status`, {
                userId: mainOrder.userId,
                orderId: orderedProduct._id,
                productId: productId,
                quantity: Number(orderedProduct.quantity),
                status: status
            })

            const {data} = response

            data.success && console.log(data.data);
            data.success && openNotificationWithIcon('success', data.data)
            data.success && setReloadOrder(prev => !prev)
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('success', error.response.data.msg)
        }
    }

    return (
        <>
        {contextHolder}
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="">
                    <h1 className='text-3xl font-bold text-center'>Order Information</h1>
                </div>
                <div className="sm:w-[80%] w-full m-auto mt-8 flex lg:flex-row flex-col">  
                    <div className="flex-1">
                        <div className="">
                            <h3 className='text-3xl font-semibold'>Shipping Info</h3>
                            <div className="mt-2 ml-2">
                                <p className='text-lg mt-1 font-semibold'>Name: <span className='font-normal'>{singleOrders?.address?.name}</span></p>
                                <p className='text-lg mt-1 font-semibold'>Mobile: <span className='font-normal'>{singleOrders?.address?.mobile}</span></p>
                                <p className='text-lg mt-1 font-semibold'>Address: <span className='font-normal'>{singleOrders?.address?.locality}, {singleOrders.address?.area}, {singleOrders.address?.city}, {singleOrders.address?.state} - {singleOrders.address?.postalCode}</span></p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className='text-3xl font-semibold'>Payment</h3>
                            <div className="mt-2 ml-2">
                                <p className={`font-semibold ${orderedProduct.status === "canceled" ? 'text-red-500' : 'text-green-500' }`}>{orderedProduct.status === "canceled" ? 'CANCELED' : 'PAID'} </p>
                                <p className='text-lg mt-1 font-semibold'>Total Amount: <span className={`font-normal ${orderedProduct.status === "canceled" && 'line-through'} `}>{orderedProduct.totalPrice}</span></p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className='text-3xl font-semibold'>Order Status</h3>
                            <div className="mt-2 ml-2">
                                <p className={`font-semibold text-lg ${orderedProduct.status === "processing" && 'text-blue-500'} ${orderedProduct.status === "shipped" && 'text-yellow-500'} ${orderedProduct.status === "delivered" && 'text-green-500'} ${orderedProduct.status === "canceled" && 'text-red-500'} capitalize`}>{orderedProduct.status}</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className='text-3xl font-semibold'>Ordered Product</h3>
                            <div className="mt-2 ml-2 flex items-center justify-between gap-8">
                                <div className=" flex items-center gap-8 flex-1">
                                    <div className=" sm:mt-0 xl:w-[10%] object-contain lg:w-[20%] sm:w-[28%] w-[40%]">
                                        <img className='w-full h-full max-h-24 sm:min-h-4 object-contain' src={productData.image_url} alt="" />
                                    </div>
                                    <p className='text-lg font-semibold'>{productData.name}</p>
                                </div>
                                <div className="">
                                    <span className='text-xl'>{orderedProduct.quantity} X {Number(orderedProduct.totalPrice)/Number(orderedProduct.quantity)} = </span>
                                    <span className='text-xl font-semibold'>{orderedProduct.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        orderedProduct.status !== 'canceled' && orderedProduct.status !== 'delivered' && (
                            <div className="lg:w-[25%] w-full mt-8 lg:mt-0 p-2">
                                <p className='text-2xl font-semibold text-center'>Proccess Order</p>
                                <div className="mt-4">
                                    <FormControl sx={{ minWidth: 100, width:"100%" }} size="small">
                                        <InputLabel id="demo-select-small-label">Status</InputLabel>
                                        <Select
                                            className='w-full'
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={status}
                                            label="Status"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'processing'}>Processeing</MenuItem>
                                            <MenuItem value={'shipped'}>Shipped</MenuItem>
                                            <MenuItem value={'delivered'}>Delivered</MenuItem>
                                            <MenuItem value={'canceled'}>Cancel</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <button 
                                    onClick={handleUpdateStatus}
                                    className='w-full bg-blue-500 py-1 mt-2 text-white rounded text-lg'>Update</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default AdminOrdersDetails