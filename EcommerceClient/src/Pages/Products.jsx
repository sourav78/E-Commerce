import React from "react";
import FilterBar from "../components/product/FilterBar";

const Products = () => {
    return (
        <>
            <div className="w-full">
                <div className="w-full">
                    <div className="w-1/5 p-2">
                        <FilterBar/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
