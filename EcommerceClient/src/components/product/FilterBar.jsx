import React, { useEffect, useState } from "react";
import Category from "./Category";

const FilterBar = () => {


    return(
        <>
            <div className="bg-white rounded shadow-md py-2">
                <div className="p-2 border-b border-gray-300">
                    <p className="font-semibold text-xl">Filters:</p>
                </div>
                <div className="">
                    <Category/>
                </div>
            </div>
        </>
    );
};

export default FilterBar;
