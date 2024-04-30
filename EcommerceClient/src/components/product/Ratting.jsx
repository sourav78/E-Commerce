import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateRatting } from "../../redux_slicer/ProductSlicer";

const Ratting = () => {

    const dispatch = useDispatch()

    const [hideOption, setHideOption] = useState(false)
    
    const [selectedRatting, setSelectedRatting] = useState('all');

    const handleHideOption = () => {
        setHideOption(!hideOption)
    }

    const onRattingChange = (e) => {
        console.log(e.target.value);
        if(e.target.value === 'all'){
            dispatch(updateRatting(null))
        }else{
            dispatch(updateRatting(e.target.value))
        }
        setSelectedRatting(e.target.value)
    }

    return (
        <>
            <div className="px-2 sm:py-2 py-0 border-b-0 sm:border-b border-gray-300 transition-all">
                <button 
                    onClick={handleHideOption}
                    className="font-semibold py-2 text-sm flex justify-between items-center w-full">
                    RATTINGS
                    <FaAngleDown className={`text-gray-500 ${hideOption ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {
                    hideOption && (
                        <>
                            <div className="fixed top-0 sm:hidden block left-0 w-full h-screen bg-[#0000006c] z-[9]"
                                    onClick={() => setHideOption(!hideOption)}
                            ></div>
                            <div className="p-2 sm:relative fixed -bottom-1 right-0 w-full bg-white sm:pt-0 pt-4 rounded-xl z-10">
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="category" id="all" value="all" onChange={onRattingChange} checked={selectedRatting === 'all'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="all">All</label>
                                </div>
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="category" id="4" value="4" onChange={onRattingChange} checked={selectedRatting === '4'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="4">4 & above</label>
                                </div>
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="category" id="3" value="3" onChange={onRattingChange} checked={selectedRatting === '3'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="3">3 & above</label>
                                </div>
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="category" id="2" value="2" onChange={onRattingChange} checked={selectedRatting === '2'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="2">2 & above</label>
                                </div>
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="category" id="1" value="1" onChange={onRattingChange} checked={selectedRatting === '1'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="1">1 & above</label>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Ratting;
