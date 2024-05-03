import React, {useState, useEffect} from "react";
import Slider from '@mui/material/Slider';
import { useDispatch } from "react-redux";
import { updatePrice } from "../../redux_slicer/ProductSlicer";
import { FaAngleDown } from "react-icons/fa";

const PriceSlider = () => {

    const dispatch = useDispatch()

    
    const [hideOption, setHideOption] = useState(window.innerWidth >= 640)
    
    const [value, setValue] = React.useState([100, 130000]);

    const handleHideOption = () => {
        setHideOption(!hideOption)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
        dispatch(updatePrice({low:newValue[0], high:newValue[1]}))
    };

    useEffect(() => {
        const handleResize = () => {
            setHideOption(window.innerWidth >= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <>
            <div className="px-2 sm:py-2 py-0 border-b-0 sm:border-b border-gray-300 no-scrollbar">
                <button 
                    onClick={handleHideOption}
                    className="font-semibold py-2 text-sm flex justify-between items-center w-full">
                    PRICE
                    <FaAngleDown className={`text-gray-500 ${hideOption ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {
                    hideOption && (
                        <>
                            <div className="fixed top-0 sm:hidden block left-0 w-full h-screen bg-[#0000006c] z-[9]"
                                    onClick={() => setHideOption(!hideOption)}
                            ></div>
                            <div className="p-2 sm:relative fixed -bottom-1 right-0 w-full sm:pt-0 pt-4 bg-white rounded-xl z-10 pb-7">
                                <div className="w-9/12 m-auto mt-2">
                                    <div className="">
                                        <Slider
                                        className="w-12"
                                            getAriaLabel={() => 'Temperature range'}
                                            value={value}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            step={1000}
                                            marks
                                            min={100}
                                            max={130000}
                                            disableSwap
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="border border-gray-400 rounded-sm px-3 py-[1px]">{value[0]}</p>
                                    <p className=" px-3 py-[1px]">to</p>
                                    <p className="border border-gray-400 rounded-sm px-3 py-[1px]">{value[1]}</p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default PriceSlider;
