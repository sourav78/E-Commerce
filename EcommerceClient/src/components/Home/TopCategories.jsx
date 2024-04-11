import React, { useEffect, useState } from "react";
import axios from 'axios'
import CategoryCard from "./CategoryCard";

import {BASE_URL} from '../../utils/constraints.js'

const TopCategories = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchData(){
            const getCategories = await axios.get(`${BASE_URL}/product/get-home-category`)
            const {data} = getCategories.data
            // console.log(import.meta.env.VITE_API_URL);
            setCategories(data)
        }

        fetchData()
    }, [])

  return <>
    <div className="">
        <h2 className="text-2xl font-semibold bg-[#49f076] border border-black p-2">Top Categories</h2>
        <div className="flex flex-wrap justify-start gap-10 mt-4">
            {
                categories.map((category, ind) => (
                    <CategoryCard key={ind} category={category} />
                ))
            }
        </div>
    </div>
  </>;
};

export default TopCategories;
