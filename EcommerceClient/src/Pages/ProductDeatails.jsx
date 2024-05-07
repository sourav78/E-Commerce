import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rate } from 'antd';
import { FaMinus, FaPlus } from "react-icons/fa6";
import axios from "axios";
import { notification } from 'antd';

import {BASE_URL} from '../utils/constraints.js'
import { useDispatch, useSelector } from "react-redux";
import { toggleCartTrigger } from "../redux_slicer/ProductSlicer.js";

const ProductDeatails = () => {

    const [api, contextHolder] = notification.useNotification();

    const isAuthenticated = useSelector(state => state.ecom.isAuthenticated)

    const user = useSelector(state => state.ecom.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [counter, setCounter] = useState(1);
    const [product, setProduct] = useState({});
    const [highlights, setHighlights] = useState({})

    const {productId} = useParams()

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

    useEffect(() => {
        async function getProduct(){

            const response = await axios.post(`${BASE_URL}/product/get-product-details`, {
                productId
            })

            const {data} = response.data
            console.log(data);
            const {_id, category, name, brand, description, price, discount, stock, image_url, ratting, ...other} = data
            console.log(other);
            setHighlights(other)
            setProduct(data)
        }

        getProduct()
    }, [])

    const incraeseCounter = () =>{
        if(counter < product.stock){
            setCounter(prev => prev+1)
        }else{
            openNotificationWithIcon('error', 'Quantity has reached the maximum stock limit.')
        }
    }
    const decreaseCounter = () =>{
        if(counter > 1){
            setCounter(prev => prev-1)
        }
    }

    const handleAddToCart = async () => {
        if(isAuthenticated){
            if(product.stock <= 1){
                openNotificationWithIcon('error', "Sorry, Product is not available right now")
            }else{
                try {
                    const response = await axios.post(`${BASE_URL}/product/add-to-cart`, {
                        userId: user._id,
                        productId: productId,
                        quantity: counter
                    })
    
                    const {data} = response

                    data.success && openNotificationWithIcon('success', data.data)
                    data.success && dispatch(toggleCartTrigger())

                } catch (error) {
                    console.log(error);
                    openNotificationWithIcon('error', error.response.data.msg)
                }
            }
        }else{
            navigate('/login')
        }
    }

  return (
    <>
        {contextHolder}
        <div className="bg-white mt-4 mx-1 lg:mx-4 rounded-lg shadow-md">
            <div className="sm:p-10 p-5">
                <p className="text-4xl font-normal">Product Details</p>
                {
                    product && (
                        <div className="mt-4 flex sm:flex-row flex-col sm:gap-10 gap-5 lg:px-24 px-3">
                            <div className=" lg:w-[30%] w-full p-2">
                                <div className="border-2 border-black p-2 lg:min-h-96 flex justify-center items-center">
                                    <img className="mix-blend-multiply h-full" src={product.image_url} alt="" />
                                </div>
                                <div className="mt-4 flex flex-wrap justify-between">
                                    <button 
                                        onClick={handleAddToCart}
                                        className="border-2 border-black w-[45%] py-2 text-xl font-semibold hover:bg-[#00ed64] bg-white  text-black transition-all">Add To Cart</button>
                                    <button className="border-2 border-black w-[45%] py-2 text-xl font-semibold bg-[#00ed64] hover:bg-white text-black transition-all">Buy Now</button>
                                </div>
                            </div>
                            <div className=" p-2 sm:flex-1">
                                <div className="">
                                    <p className="text-xl font-semibold text-gray-500">{product.category}</p>
                                    <p className="text-[28px] font-semibold">{product.name}</p>
                                    <p className="text-xl font-bold">{product.brand}</p>
                                    <p className="text-[18px] text-gray-600 mt-2">{product.description}</p>
                                    <div className="mt-4 flex gap-3 items-end">
                                        <p className="text-4xl font-bold">₹{product.price}</p>
                                        <p className=" font-normal text-gray-700 line-through">₹{Math.round(Number(product.price)/(1-(Number(product.discount)/100)))}</p>
                                        <p className=" text-green-600 font-semibold">{product.discount}% off</p>
                                    </div>
                                    <div className="mt-4">
                                        <Rate className="" style={{fontSize:'20px', margin: '0'}} allowHalf disabled value={product.ratting} />
                                        <p className="bg-green-600 inline px-1 rounded-sm ml-2 text-white text-lg">{product.ratting}</p>
                                    </div>
                                    <div className="mt-4 flex gap-8">
                                        <p className=" text-gray-500">Highlight: </p>
                                        <ul className="list-disc">
                                            {
                                                highlights && (
                                                    Object.keys(highlights).map((high) => (
                                                        <li>{high}: {highlights[high]}</li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-500 mb-2 select-none">Qantity:</p>
                                        <div className="w-40 border border-black h-10 flex">
                                            <div 
                                                onClick={decreaseCounter}
                                            className="cursor-pointer grid place-content-center w-[33%] h-full border-r hover:bg-[#aaf8b6] border-black">
                                                <FaMinus />
                                            </div>
                                            <div className="grid place-content-center select-none w-[33%] h-full border-r border-black">
                                                <p>{counter}</p>
                                            </div>
                                            <div 
                                                onClick={incraeseCounter}
                                            className="cursor-pointer grid place-content-center w-[33%] h-full hover:bg-[#aaf8b6] border-black">
                                                <FaPlus />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </>
  );
};

export default ProductDeatails;
