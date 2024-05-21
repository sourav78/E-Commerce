import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import AllProducts from '../../components/Admin/Products/AllProducts';

const AdminAllProducts = () => {

    const [allCategories, setAllCategories] = useState([])

    const [selectedCategory, setSelectedCategory] = useState('all')


    useEffect(() => {
        async function fetchCategory(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/get-home-category`)
                const {data} = response
                
                data.success && setAllCategories(data.data)
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchCategory()
    }, [])

    return (
        <>
            <div className='bg-white flex-1 rounded-md shadow-md p-2'>
                <div className="">
                    <div className=" bg-blue-500 rounded flex items-center">
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Name</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Image</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4">
                            <p className='text-lg font-semibold text-white'>Price</p>
                        </div>
                        <div className="p-2 border-r border-gray-500 w-1/4 ">
                            <FormControl className='w-full sm:w-1/2' variant="standard" sx={{'& .MuiInputLabel-root': { color: 'white' }, '& .MuiSelect-root': { color: 'white' }, '& .MuiSvgIcon-root': { color: 'white' }}}>
                                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    label="Category"
                                    size='small'
                                    sx={{
                                        color: 'white',
                                        '.MuiOutlinedInput-notchedOutline': {
                                          borderColor: 'white',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                          borderColor: 'white',
                                        },
                                        '.MuiSvgIcon-root': {
                                          color: 'white',
                                        },
                                    }}
                                >
                                <MenuItem value="all">
                                    <em>None</em>
                                </MenuItem>
                                
                                {
                                    allCategories && allCategories.map(category => (
                                        <MenuItem key={category.category} value={category.category}>{category.category}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="">
                        <AllProducts selectedCategory={selectedCategory}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAllProducts