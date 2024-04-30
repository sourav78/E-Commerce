import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateDataOrder } from "../../redux_slicer/ProductSlicer";

const SortBy = () => {
    const dispatch = useDispatch()

    const [hideOption, setHideOption] = useState(false)
    const [selectedRatting, setSelectedRatting] = useState('rec');

    const handleHideOption = () => {
        setHideOption(!hideOption)
    }

    const onRattingChange = (e) => {
        console.log(e.target.value);
        dispatch(updateDataOrder(e.target.value))
        setSelectedRatting(e.target.value)
    }
    return (
        <>
            <div className="px-2 sm:py-2 py-0 border-b-0 sm:border-b border-gray-300 transition-all">
                <button 
                    onClick={handleHideOption}
                    className="font-semibold py-2 text-sm flex justify-between items-center w-full text-nowrap">
                    SORT BY
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
                                    <input className=" cursor-pointer " type="radio" name="rec" id="rec" value="rec" onChange={onRattingChange} checked={selectedRatting === 'rec'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="rec">Recomended</label>
                                </div>
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="lth" id="lth" value="lth" onChange={onRattingChange} checked={selectedRatting === 'lth'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="lth">Low-High</label>
                                </div>
                                <div className="flex items-center sm:gap-1 gap-2 sm:mb-0 mb-1">
                                    <input className=" cursor-pointer " type="radio" name="htl" id="htl" value="htl" onChange={onRattingChange} checked={selectedRatting === 'htl'} />
                                    <label className=" cursor-pointer font-semibold text-xl sm:text-[16px]" htmlFor="htl">High-Low</label>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default SortBy;
