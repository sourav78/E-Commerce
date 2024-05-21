import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SingleAddressCheckout from './SingleAddressCheckout'
import AddNewAddress from '../profile/address/AddNewAddress'

const AddressCheckout = ({userId, selectedAddress, setIsAddressSet, isAddressSet}) => {

    const [address, setAddress] = useState([])

    const [clickedAddress, setClickedAddress] = useState({})

    const [reloadAddress, setReloadAddress] = useState(false)

    useEffect(() => {
        async function fetchAllAddress(){
            
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/get-address/${userId}`)

                const {data} = response

                data.success && setAddress(data.data)
            } catch (error) {
                console.log(error.message);
            }

        }

        fetchAllAddress()
    }, [reloadAddress])

    return (
        <>
            <div className="mt-4 bg-white rounded overflow-y-hidden shadow-md">
                <div className={`${isAddressSet ? "bg-white" : "bg-[#00ed64]"} p-4 flex items-start justify-between`}>
                    <div className="flex items-start gap-2">
                        <p className='w-6 h-6 bg-gray-200 rounded-sm text-green-600 text-center'>2</p>
                        <div className="">
                            <p className={`font-semibold ${isAddressSet ? "text-gray-500" : "text-black"}`}>DELIVERY ADDRESS</p>
                            { 
                                selectedAddress && (
                                    <p className='text-sm'>{selectedAddress.name}, {selectedAddress.area}, {selectedAddress.locality}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postalCode}
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    {
                        isAddressSet ? (
                            <div className="">
                                <button 
                                    onClick={() => setIsAddressSet(false)}
                                className='px-2 py-1 border border-gray-400 rounded'>Change</button>
                            </div>
                        ) : (
                            <div className="">
                                <button 
                                    onClick={() => setReloadAddress(prev => !prev)}
                                className='px-2 py-1 border bg-white shadow-md hover:bg-gray-100 border-gray-400 rounded'>Reload</button>
                            </div>
                        )
                    }
                </div>
                {
                    !isAddressSet && (
                        <div className="">
                            {
                                address ? (
                                    <div className="">
                                        {
                                            address.map(add => (
                                                <SingleAddressCheckout key={add._id} address={add} setClickedAddress={setClickedAddress} clickedAddress={clickedAddress} setIsAddressSet={setIsAddressSet}/>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="">
                                        <p>Loadding...</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    !isAddressSet && (
                        <div className="">
                            <AddNewAddress/>
                        </div>
                    )
                }
                
            </div>
        </>
    )
}

export default AddressCheckout