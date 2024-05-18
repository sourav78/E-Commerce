import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { notification } from 'antd';

const AdminEditProduct = () => {

    const {productId} = useParams()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')

    const [product, setProduct] = useState({})

    
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        async function getProduct(){

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/get-product-details`, {
                productId
            })

            const {data} = response
            data.success && setProduct(data.data)
            data.success && setName(data.data.name)
            data.success && setBrand(data.data.brand)
            data.success && setCategory(data.data.category)
            data.success && setStock(data.data.stock)
            data.success && setDescription(data.data.description)
            data.success && setPrice(data.data.price)
            data.success && setDiscount(data.data.discount)
        }

        getProduct()
    }, [])

    const handleEditProduct = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/edit-product`, {
                id: productId,
                name,
                brand,
                category,
                stock,
                description,
                price,
                discount
            })
    
            const {data} = response

            data.success && console.log(data.data);
            data.success && openNotificationWithIcon('success', data.data);
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', error.response.data.msg)
        }
    }

    return (
        <>
        {contextHolder}
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="">
                    <h1 className='text-3xl text-center sm:text-4xl font-bold'>EDIT PRODUCT</h1>
                </div>
                <div className=" xl:w-[80%] lg:w-[85%] sm:w-[95%] w-full mt-8 p-2 m-auto border-gray-500 rounded px-2">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className=" sm:mt-0 xl:w-[30%] object-contain border border-black lg:w-[20%] sm:w-[35%] w-[60%] p-2">
                            <img className='w-full h-full max-h-[400px] sm:min-h-4 object-contain' src={product.image_url} alt="" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="sm:w-1/2 w-full">
                                    <label className='font-semibold mb-2'>Product Name:</label>
                                    <TextField
                                        className="w-full"
                                        required
                                        id="name"
                                        size='small'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="sm:w-1/2 w-full">
                                    <label className='font-semibold mb-2'>Brand:</label>
                                    <TextField
                                        className="w-full"
                                        required
                                        id="outlined-required"
                                        size='small'
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className="sm:w-1/2 w-full">
                                    <label className='font-semibold mb-2'>Category:</label>
                                    <TextField
                                        className="w-full"
                                        required
                                        id="name"
                                        size='small'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>
                                <div className="sm:w-1/2 w-full">
                                    <label className='font-semibold mb-2'>Stock:</label>
                                    <TextField
                                        className="w-full"
                                        required
                                        id="outlined-required"
                                        type='number'
                                        size='small'
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className=" w-full">
                                    <label className='font-semibold mb-2'>Description:</label>
                                    <TextField
                                        className="w-full"
                                        required
                                        id="name"
                                        size='small'
                                        multiline
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className="sm:w-1/2 w-full">
                                    <label className='font-semibold mb-2'>Price:</label>
                                    <TextField
                                        className="w-full"
                                        required
                                        id="name"
                                        size='small'
                                        type='number'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="sm:w-1/2 w-full">
                                    <label className='font-semibold mb-2'>Discount (in %):</label>
                                    <TextField
                                        className="w-full"
                                        required
                                        id="outlined-required"
                                        type='number'
                                        size='small'
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className=" flex justify-between mt-8">
                                <button 
                                    onClick={() => navigate("../all-products")}
                                    className='w-[35%] py-3 border rounded-sm border-black text-lg font-semibold'>CANCEL</button>
                                <button 
                                    onClick={handleEditProduct}
                                    className='w-[35%] py-3 rounded-sm border-black text-lg font-semibold bg-blue-500 text-white'>EDIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminEditProduct