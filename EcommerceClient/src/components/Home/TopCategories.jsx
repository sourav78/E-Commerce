import React, { useEffect, useState } from "react";
import axios from 'axios'
import CategoryCard from "./CategoryCard";

const TopCategories = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchData(){
            const getCategories = await axios.get('http://localhost:4001/product/get-home-category')
            const data = getCategories.data
            // console.log(data);
            setCategories(data.msg)
        }

        fetchData()
    }, [])

  return <>
    <div className="">
        <h2 className="text-2xl font-semibold">Top Categories</h2>
        <div className="flex flex-wrap justify-start gap-10 mt-4">
            {
                categories.map(category => (
                    <CategoryCard category={category} />
                ))
            }
        </div>
    </div>
  </>;
};

export default TopCategories;
