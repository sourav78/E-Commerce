import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateAddress } from '../../redux_slicer/OrderSlicer'

const SingleAddressCheckout = ({address, setClickedAddress, clickedAddress, setIsAddressSet}) => {

    const dispatch = useDispatch()

    const [showDeliveryButton, setShowDeliveryButton] = useState(false)

    useEffect(() => {
        if(address._id === clickedAddress._id){
            setShowDeliveryButton(true)
        }else{
            setShowDeliveryButton(false)
        }
    }, [clickedAddress])

    const onAddressClick = () => {
        setClickedAddress(address)
    }

    const handleDeliverHere = () => {
        dispatch(updateAddress(address))
        setIsAddressSet(true)
    }

    return (
        <>
            <div 
                onClick={onAddressClick}
                className="w-full border-b border-gray-300 sm:p-6 p-2">
                <div className="">
                    <div className="flex justify-between items-center">
                        <span className="px-[6px] py-[3px] rounded-sm text-[12px] font-semibold text-white bg-green-500 capitalize">{address.type}</span>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <span className="font-semibold text-sm">{address.name}</span>
                        <span className="font-semibold text-sm">{address.mobile}</span>
                    </div>
                    <div className=" lg:w-10/12 w-full mt-2">
                        <span className="text-sm">{address.area}, </span>
                        <span className="text-sm">{address.locality}, </span>
                        <span className="text-sm">{address.city}, </span>
                        <span className="text-sm">{address.state} - </span>
                        <span className="text-sm font-semibold">{address.postalCode}</span>
                    </div>
                    {
                        showDeliveryButton && (
                            <div className="mt-2">
                                <button
                                    onClick={handleDeliverHere}
                                    className='sm:px-12 px-8 py-3 border border-black font-semibold bg-[#00ed64]'
                                >DELIVER HERE</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SingleAddressCheckout