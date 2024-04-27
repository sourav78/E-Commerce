import React from "react";
import { Rate } from 'antd';
import { Link } from "react-router-dom";

const ProductCardVertical = ({product}) => {
    return (
        <>
            <div className="border p-2 rounded-md w-[22%] min-w-48 bg-white flex-1 lg:flex-none hover:shadow-md transition-all">
                <div className="w-full p-4">
                    <img
                        className="m-auto h-full max-h-56 sm:min-h-56 object-contain mix-blend-multiply"
                        style={{mixBlendMode: "multiply"}}
                        src={product.image_url}
                        alt=""
                    />
                </div>
                <div className="p-2">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <div className="mt-1 flex justify-between items-end">
                        <p className="text-2xl font-bold">₹{product.price}</p>
                        <div className="flex items-end gap-1">
                            <p className="text-sm text-gray-500 line-through">₹{Math.round(Number(product.price)/(1-(Number(product.discount)/100)))}</p>
                            <p className="text-[12px] text-green-500 font-semibold">{product.discount}% off</p>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between items-end">
                        <div className="">
                            <Rate className="" style={{fontSize:'15px', margin: '0'}} allowHalf disabled value={product.ratting} />
                            <p className="bg-green-600 inline px-1 rounded-sm ml-1 text-white text-sm">{product.ratting}</p>
                        </div>
                        <p className="text-[16px] font-bold ">{product.brand}</p>
                    </div>
                    <div className="mt-4">
                        <Link to={`../details/${product._id}`}>
                            <p className=" cursor-pointer text-xl border-2 border-black inline-block px-4 py-1 font-semibold hover:bg-[#00ed64]  transition-all">View</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCardVertical;
