import React, { useEffect, useState } from "react";
import axios from 'axios'
import CategoryCard from "./CategoryCard";

const TopCategories = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchData(){
            const getCategories = await axios.get('http://localhost:4001/product/get-home-category')
            const {data} = getCategories.data
            // console.log(import.meta.env.VITE_API_URL);
            setCategories(data)
        }

        fetchData()
    }, [])

  return <>
    <div className="">
        <h2 className="text-2xl font-semibold bg-slate-300 p-2">Top Categories</h2>
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
