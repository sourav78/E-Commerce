import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import {BASE_URL} from '../../utils/constraints'
import { useDispatch } from "react-redux";
import { updateCategory } from "../../redux_slicer/ProductSlicer";

const Category = () => {

    const dispatch = useDispatch()

    const [hideOption, setHideOption] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [allCategories, setAllCategories] = useState([])
    

    const handleHideOption = () => {
        setHideOption(!hideOption)
    }

    const onCategoryChange = (e) => {
        console.log(e.target.value);
        dispatch(updateCategory(e.target.value))
        setSelectedCategory(e.target.value)
    }
    useEffect(() => {
        async function fetchCategory(){
            try {
                const response = await axios.get(`${BASE_URL}/product/get-home-category`)
                const {data} = response
                data.success && console.log(data);
                data.success && setAllCategories(data.data)
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchCategory()
    }, [])
    return (
        <>
            <div className="px-2 sm:py-2 py-0 border-b-0 sm:border-b border-gray-300">
                <div className="transition-all">
                    <button 
                        onClick={handleHideOption}
                        className="font-semibold py-2 text-sm flex justify-between items-center w-full">
                        CATEGORY
                        <FaAngleDown className={`text-gray-500 ${hideOption ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {
                        hideOption && (
                            <div className="p-2 sm:border-t-0 border-t-2 border-black sm:relative fixed -bottom-1 right-0 w-full sm:bg-white bg-slate-300 rounded-xl z-10">
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="category" id="all" value="all" onChange={onCategoryChange} checked={selectedCategory === 'all'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="all">All</label>
                                </div>
                                {
                                    allCategories.map(cat => (
                                        <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                            <input className=" cursor-pointer " type="radio" name="category" id={cat.category} value={cat.category} onChange={onCategoryChange} checked={selectedCategory === cat.category} />
                                            <label className=" cursor-pointer font-semibold text-xl sm:text-[16px] capitalize" htmlFor={cat.category}>{cat.category}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Category;
