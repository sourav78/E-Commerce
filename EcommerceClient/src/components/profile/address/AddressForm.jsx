import React, { useState } from "react";
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

const AddressForm = () => {

    const [addressName, setAddressName] = useState('')
    const [addressMobile, setAddressMobile] = useState('')
    const [addressPincode, setAddressPincode] = useState('')
    const [addressLocality, setAddressLocality] = useState('')
    const [addressArea, setAddressArea] = useState('')
    const [addressCity, setAddressCity] = useState('')
    const [addressState, setAddressState] = useState('')
    const [addressType, setAddressType] = useState('')

    const onHandleSave = () => {
        console.log(addressName);
        console.log(addressMobile);
        console.log(addressPincode);
        console.log(addressLocality);
        console.log(addressArea);
        console.log(addressCity);
        console.log(addressState);
        console.log(addressType);
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
    }

    const onAddressChange = (e) => {
        console.log(e.target.value);
        setAddressType(e.target.value)
    }

    return (
        <>
            <div className="p-6 bg-[#F5FAFF] border border-gray-300">
                <div className="">
                    <p className="text-sm font-semibold text-[#00ce56]">ADD NEW ADDRESS</p>
                </div>
                <div className="w-4/5">
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
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={addressState}
                                        label="Age"
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
                                    onChange={onAddressChange}
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
