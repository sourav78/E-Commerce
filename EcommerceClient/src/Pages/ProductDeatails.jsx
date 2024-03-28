import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Rate } from 'antd';
import { FaMinus, FaPlus } from "react-icons/fa6";
import axios from "axios";

const ProductDeatails = () => {

    const [counter, setCounter] = useState(1);
    const [product, setProduct] = useState({});
    const [highlights, setHighlights] = useState({})
    
    

    const {productId} = useParams()

    useEffect(() => {
        async function getProduct(){

            const response = await axios.post('http://localhost:4001/product/get-product-details', {
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
        }
    }
    const decreaseCounter = () =>{
        if(counter > 1){
            setCounter(prev => prev-1)
        }
    }

  return (
    <>
        <div className="">
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
                                    <button className="border-2 border-black w-[45%] py-2 text-xl font-semibold hover:bg-black bg-white hover:text-white text-black transition-all">Add To Cart</button>
                                    <button className="border-2 border-black w-[45%] py-2 text-xl font-semibold bg-black hover:bg-white text-white hover:text-black transition-all">Buy Now</button>
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
                                            {/* <li>key: value</li>
                                            <li>key: value</li>
                                            <li>key: value</li> */}
                                        </ul>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-500 mb-2 select-none">Qantity:</p>
                                        <div className="w-40 border border-black h-10 flex">
                                            <div 
                                                onClick={decreaseCounter}
                                            className="cursor-pointer grid place-content-center w-[33%] h-full border-r border-black">
                                                <FaMinus />
                                            </div>
                                            <div className="grid place-content-center select-none w-[33%] h-full border-r border-black">
                                                <p>{counter}</p>
                                            </div>
                                            <div 
                                                onClick={incraeseCounter}
                                            className="cursor-pointer grid place-content-center w-[33%] h-full border-black">
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
