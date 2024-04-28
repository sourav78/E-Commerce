import React, { useEffect, useState } from "react";
import Category from "./Category";

const FilterBar = () => {


    return(
        <>
            <div className="bg-white rounded shadow-md py-2">
                <div className="p-2 border-b border-gray-300 sm:block hidden">
                    <p className="font-semibold text-xl">Filters:</p>
                </div>
                <div className="flex flex-row sm:flex-col sm:overflow-x-auto overflow-x-scroll">
                    <Category/>
                </div>
            </div>
        </>
    );
};

export default FilterBar;
