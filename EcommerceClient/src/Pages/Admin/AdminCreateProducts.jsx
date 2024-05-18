import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import '../../App.css'
import axios from 'axios';
import { notification } from 'antd';

const AdminCreateProducts = () => {
    
    const [api, contextHolder] = notification.useNotification();


    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const [imageFile, setImageFile] = useState(null)

    const [toggleImageType, setToggleImageType] = useState(true)

    const [onPromiseState, setOnPromiseState] = useState(false)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight'
        });
    };

    const onClose = () => {
        setName('')
        setBrand('')
        setCategory('')
        setDescription('')
        setPrice('')
        setStock('')
        setDiscount('')
        setImageUrl('')
        setImageFile('')
    }

    const handleAddProduct = async () => {
        setOnPromiseState(true)
        if(toggleImageType){
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/add-product-url`, {
                    name: name,
                    category: category,
                    brand: brand,
                    description: description,
                    price: price,
                    discount: discount,
                    stock: stock,
                    imageUrl: imageUrl
                })
    
                const {data} = response
                data.success && openNotificationWithIcon('success', data.data)
                data.success && onClose()
                data.success && setOnPromiseState(false)
            } catch (error) {
                console.log(error);
                openNotificationWithIcon('error', error.response.data.msg)
                setOnPromiseState(false)
            }
        }else{
            const formData = new FormData()
            formData.append('uploadImage', imageFile)
            formData.append('name', name)
            formData.append('category', category)
            formData.append('brand', brand)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('discount', discount)
            formData.append('stock', stock)

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/add-product-img`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
    
                const {data} = response
                data.success && openNotificationWithIcon('success', data.data)
                data.success && onClose()
                data.success && setOnPromiseState(false)
            } catch (error) {
                console.log(error);
                openNotificationWithIcon('error', error.response.data.msg)
                setOnPromiseState(false)
            }
        }
    }

    

    return (
        <>
            {contextHolder}
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="flex justify-start items-center w-full p-4 flex-col">
                    <div className="">
                        <h1 className='text-3xl text-center sm:text-4xl font-bold'>ADD NEW PRODUCT</h1>
                    </div>
                    <div className="xl:w-[60%] lg:w-[70%] sm:w-[90%] w-full mt-4 border-gray-500 rounded px-6">
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
                        <div className="mt-4">
                            <div className=" w-full sm:w-1/2 border-black p-4 m-auto flex justify-between">
                                <button 
                                    onClick={() => setToggleImageType(true)}
                                className={`w-24 outline ${toggleImageType ? 'outline-4' : 'outline-2'} outline-blue-500 py-[6px] rounded bg-blue-300 text-black font-semibold`}>URL</button>
                                <button 
                                    onClick={() => setToggleImageType(false)}
                                className={`w-24 outline ${!toggleImageType ? 'outline-4' : 'outline-2'} outline-blue-500 py-[6px] rounded bg-blue-300 text-black font-semibold`}>UPLOAD</button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {
                                    toggleImageType ? (
                                        <div className=" w-full">
                                            <label className='font-semibold mb-2'>Image URL:</label>
                                            <TextField
                                                className="w-full"
                                                required
                                                id="name"
                                                size='small'
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full mt-1">
                                            <div className="border border-gray-400 p-2 rounded-md">
                                                <input 
                                                    onChange={(e) => setImageFile(e.target.files[0])}
                                                    type="file" />
                                            </div>
                                        </div>
                                    )
                                }                            
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button 
                                onClick={handleAddProduct}
                                disabled={onPromiseState}
                                className={`text-lg font-semibold px-12 py-2 rounded ${onPromiseState ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500'} text-white`}>Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminCreateProducts