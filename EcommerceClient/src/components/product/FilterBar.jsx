import React, { useEffect, useState } from "react";
import Category from "./Category";
import PriceSlider from "./PriceSlider";
import Ratting from "./Ratting";
import SortBy from "./SortBy";

const FilterBar = () => {


    return(
        <>
            <div className="bg-white rounded shadow-md pt-2">
                <div className="p-2 border-b border-gray-300 sm:block hidden">
                    <p className="font-semibold text-xl">Filters:</p>
                </div>
                <div className="flex flex-row sm:flex-col sm:overflow-x-auto overflow-x-scroll">
                    <Category/>
                    <PriceSlider/>
                    <Ratting/>
                    <SortBy/>
                </div>
            </div>
        </>
    );
};

export default FilterBar;
