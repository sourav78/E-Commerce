import React, { useEffect, useState } from 'react'
import SingleUnavailableProduct from './SingleUnavailableProduct';
import axios from 'axios';
import ReactPaginate from 'react-paginate'

const UnavailableStock = () => {

    const [unavailableProducts, setUnavailableProducts] = useState([])

    const [products, setProducts] = useState([])

    const [selectedPage, setSelectedPage] = useState(0)

    useEffect(() => {
        async function getTransactionData(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-unavailable-products`)
                const {data} = response
                
                data.success && setUnavailableProducts(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        getTransactionData()
    }, [])
    
    useEffect(() => {
        const productSegment = unavailableProducts.slice(selectedPage * 5, selectedPage * 5 + 5)
        setProducts(productSegment)
    }, [selectedPage, unavailableProducts])

    const handlePageChange = (data) => {
        setSelectedPage(Number(data.selected))
    }

    return (
        <>
            <div className="">
                <p className='font-bold'>Unavailable Stock</p>
                <div className="mt-2">
                    <div className="">
                        <div className=" bg-blue-500 rounded flex items-center">
                            <div className="p-2 border-r border-gray-500 w-1/3">
                                <p className='text-lg font-semibold text-white'>Image</p>
                            </div>
                            <div className="p-2 border-r border-gray-500 w-1/3">
                                <p className='text-lg font-semibold text-white'>Name</p>
                            </div>
                            <div className="p-2 border-gray-500 w-1/3">
                                <p className='text-lg font-semibold text-white'>Category</p>
                            </div>
                        </div>
                        <div className="">
                            {
                                products && products.map(product => (
                                    <SingleUnavailableProduct key={product._id} product={product}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="">
                    {
                        unavailableProducts.length > 5 && (
                            <div className="mt-2">
                                <ReactPaginate 
                                    previousLabel={'Previous'}
                                    nextLabel={'Next'}
                                    pageCount={Math.ceil(unavailableProducts.length/5)}
                                    onPageChange={handlePageChange}
                                    containerClassName=" flex flex-wrap justify-center gap-2"
                                    pageClassName="border-2 border-blue-400 px-4 py-2 rounded"
                                    pageLinkClassName=""
                                    previousClassName="border-2 border-blue-400 px-4 py-2 rounded bg-blue-400"
                                    previousLinkClassName=""
                                    nextClassName="border-2 border-blue-400 px-4 py-2 rounded  bg-blue-400"
                                    nextLinkClassName=""
                                    breakClassName="px-2 py-2 text-xl"
                                    breakLinkClassName=""
                                    activeClassName="border-2 border-blue-400 px-4 py-2 rounded bg-blue-400"
                                    activeLinkClassName=""
                                />
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>    
        </>
    )
}

export default UnavailableStock