import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import {statesOfIndia} from '../../../utils/constraints'
import { useSelector } from "react-redux";
import axios from "axios";

const AddressForm = ({setShowAddressForm, address, setAddressStatus, setLoadAddress}) => {


    const user = useSelector(state => state.ecom.user)

    const [addressName, setAddressName] = useState(address?.name || '')
    const [addressMobile, setAddressMobile] = useState(address?.mobile || '')
    const [addressPincode, setAddressPincode] = useState(address?.postalCode || '')
    const [addressLocality, setAddressLocality] = useState(address?.locality || '')
    const [addressArea, setAddressArea] = useState(address?.area || '')
    const [addressCity, setAddressCity] = useState(address?.city || '')
    const [addressState, setAddressState] = useState(address?.state || '')
    const [addressType, setAddressType] = useState(address?.type || '')

    useEffect(() => {

    }, [user])

    async function addNewAddress(){

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/profile/add-new-address`, {
                id: user._id,
                name: addressName,
                mobile: addressMobile,
                locality: addressLocality,
                area: addressArea,
                city: addressCity,
                state: addressState,
                postalCode: addressPincode,
                type: addressType
            },{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
    
            const {data} = response
    
            data.success && setAddressStatus({success: true, type: 'success', msg: data.data})
            data.success && onHandleCancel()
            data.success && setLoadAddress(prev => !prev)
        } catch (error) {
            console.log(error.message);
            console.log(error.response.data.msg);
            setAddressStatus({success: false, type: 'error', msg: error.response.data.msg})
        }
    }
    
    async function editAddress(){

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/profile/update-address`, {
                addressId: address._id,
                name: addressName,
                mobile: addressMobile,
                locality: addressLocality,
                area: addressArea,
                city: addressCity,
                state: addressState,
                postalCode: addressPincode,
                type: addressType
            },{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
    
            const {data} = response
    
            data.success && setAddressStatus({success: true, type: 'success', msg: data.data})
            data.success && onHandleCancel()
            data.success && setLoadAddress(prev => !prev)
        } catch (error) {
            console.log(error.message);
            console.log(error.response.data.msg);
            setAddressStatus({success: false, type: 'error', msg: error.response.data.msg})
        }
    }

    const onHandleSave = async () => {

        if(address){
            await editAddress()
        }else{
            addNewAddress()
        }
    }

    const onHandleCancel = () => {
        setAddressName('')
        setAddressMobile('')
        setAddressPincode('')
        setAddressLocality('')
        setAddressArea('')
        setAddressCity('')
        setAddressState('')
        setAddressType('')

        setShowAddressForm(false)
    }

    return (
        <>
            <div className="sm:p-6 p-2 bg-[#F5FAFF] border border-gray-300">
                <div className="">
                    <p className="text-sm font-semibold text-[#00ce56]">{address ? `EDIT ADDRESS` : `ADD NEW ADDRESS`}</p>
                </div>
                <div className="sm:w-4/5 w-full">
                    <div className="mt-4 flex flex-wrap gap-4 justify-between">
                        <div className="sm:w-[45%] w-full">
                            <p className="mb-2 font-semibold">Name</p>
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required"
                                label="Name"
                                value={addressName}
                                onChange={(e) => setAddressName(e.target.value)}
                            />
                        </div>
                        <div className="sm:w-[45%] w-full">
                            <p className="mb-2 font-semibold">Mobile Number</p>
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required"
                                label="10-digit mobile number"
                                value={addressMobile}
                                onChange={(e) => setAddressMobile(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 justify-between">
                        <div className="sm:w-[45%] w-full">
                            <p className="mb-2 font-semibold">Pincode</p>
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required"
                                label="Pincode"
                                value={addressPincode}
                                onChange={(e) => setAddressPincode(e.target.value)}
                            />
                        </div>
                        <div className="sm:w-[45%] w-full">
                            <p className="mb-2 font-semibold">Locality</p>
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required"
                                label="Locality"
                                value={addressLocality}
                                onChange={(e) => setAddressLocality(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="">
                            <p className="mb-2 font-semibold">Area</p>
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required"
                                label="Area and Street"
                                value={addressArea}
                                onChange={(e) => setAddressArea(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 justify-between">
                        <div className="sm:w-[45%] w-full">
                            <p className="mb-2 font-semibold">City</p>
                            <TextField
                                className="w-full"
                                required
                                id="outlined-required"
                                label="city/district/town"
                                value={addressCity}
                                onChange={(e) => setAddressCity(e.target.value)}
                            />
                        </div>
                        <div className="sm:w-[45%] w-full">
                            <p className="mb-2 font-semibold">State</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={addressState}
                                        label="State"
                                        onChange={(e) => setAddressState(e.target.value)}
                                    >
                                        {
                                            statesOfIndia.map(state => (
                                                <MenuItem key={state} value={state}>{state}</MenuItem>
                                            ))
                                        }
                                    </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="mt-4">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Address Type</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    defaultValue={addressType}
                                    onChange={(e) => setAddressType(e.target.value)}
                                >
                                    <div className="flex">
                                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                                        <FormControlLabel value="home" control={<Radio />} label="Home" />
                                    </div>
                                </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="mt-4">
                        <div className="">
                            <button 
                            onClick={onHandleSave}
                                className="border-2 border-black sm:px-24 px-16 py-3 font-semibold bg-[#00ed64]">SAVE</button>
                            <button 
                                onClick={onHandleCancel}
                                className=" px-10 py-3 font-semibold text-red-600">CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddressForm;
