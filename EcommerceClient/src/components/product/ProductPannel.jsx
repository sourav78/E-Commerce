import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import {BASE_URL} from '../../utils/constraints'
import { useSelector } from "react-redux";
import ProductCardVertical from "../Home/ProductCardVertical";
import ProductPagination from "./ProductPagination";

const ProductPannel = () => {

    const [allProducts, setAllProducts] = useState(null)
    const [totalData, setTotalData] = useState(0);

    const [selectedPage, setSelectedPage] = useState(0)
    

    const categoryFilter = useSelector(state => state.product.category)

    const priceFilter = useSelector(state => state.product.price)
    const rattingFilter = useSelector(state => state.product.ratting)
    const dataOrderFilter = useSelector(state => state.product.dataOrder)


    useEffect(() => {
        async function fetchProduct(){
            try {
                const response = await axios.post(`${BASE_URL}/product/get-filtered-product?limit=12&skip=${selectedPage}`, {
                    category: categoryFilter,
                    price: priceFilter,
                    ratting: rattingFilter,
                    dataOrder: dataOrderFilter
                }, {
                    headers: {
                        'Content-Type': 'Application/json'
                    }
                })
    
                const {data} = response

                data.success && console.log(data.data.products);;
                data.success && setAllProducts(data.data.products);
                data.success && setTotalData(data.data.total)
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchProduct()
    }, [categoryFilter, priceFilter, rattingFilter, dataOrderFilter, selectedPage])


    return (
        <>
            <div className=" border-black pb-4">
                <div className="bg-white rounded shadow p-4">
                    <div className="">
                        <div className=" flex gap-2 items-center border-2 border-gray-400 w-1/4 px-2 py-1 rounded-sm">
                            <CiSearch className="text-xl text-gray-500" />
                            <input className="outline-none " type="text" placeholder="Search..." name="search" id="" />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-wrap justify-start gap-10">
                        {
                            allProducts && allProducts.map((product) => (
                                <ProductCardVertical key={product._id} product={product}/>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-8">
                    <ProductPagination totalData={totalData} setSelectedPage={setSelectedPage} />
                </div>
            </div>
        </>
    );
};

export default ProductPannel;
