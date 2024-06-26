import React from "react";
import FilterBar from "../components/product/FilterBar";
import ProductPannel from "../components/product/ProductPannel";

const Products = () => {
    return (
        <>
            <div className="w-full">
                <div className="w-full flex sm:flex-row flex-col">
                    <div className="sm:w-1/5 w-full p-2">
                        <FilterBar/>
                    </div>
                    <div className=" p-2 flex-1 h-full">
                        <ProductPannel/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
