import React, { useEffect, useState } from "react";
import axios from "axios";
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
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/get-filtered-product?limit=12&skip=${selectedPage}`, {
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

                data.success && console.log(data.data.products);
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
                <div className="mt-2">
                    <p className="text-xl font-semibold">Results</p>
                    <p className="text-xs">Check each product page for other buying options.</p>
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
