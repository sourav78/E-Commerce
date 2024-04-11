import React, {useState, useEffect} from "react";
import axios from "axios";
import ProductCardVertical from "./ProductCardVertical";

import {BASE_URL} from '../../utils/constraints.js'

const LatestProduct = () => {

    const [latestProduct, setLatestProduct] = useState([])

    useEffect(() => {
        async function fetchData(){
            const getLatestProduct = await axios.get(`${BASE_URL}/product/get-latest-product`)
            const {data} = getLatestProduct.data
            // console.log(import.meta.env.VITE_API_URL);
            setLatestProduct(data)
        }

        fetchData()
    }, [])

  return (
    <>
        <div className="mt-8">
            <h2 className="text-2xl font-semibold bg-slate-300 p-2">Latest Products</h2>
            <div className="flex flex-wrap justify-start gap-10 mt-4">
                {
                    latestProduct.map((product) => (
                        <ProductCardVertical key={product._id} product={product}/>
                    ))
                }
            </div>
        </div>
    </>
  );
};

export default LatestProduct;
