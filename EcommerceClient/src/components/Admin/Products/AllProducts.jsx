import React, { useEffect, useState } from 'react'
import AdminSingleProduct from './AdminSingleProduct'
import ReactPaginate from 'react-paginate'
import axios from 'axios'

const AllProducts = ({selectedCategory}) => {

    const [selectedPage, setSelectedPage] = useState(0)

    const [allProducts, setAllProducts] = useState(null)
    const [totalData, setTotalData] = useState(0);

    const [reloadProducts, setReloadProducts] = useState(false)

    useEffect(() => {
        async function fetchProduct(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-all-product?category=${selectedCategory}&limit=20&skip=${selectedPage}`)
    
                const {data} = response

                data.success && setAllProducts(data.data.products);
                data.success && setTotalData(data.data.total)
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchProduct()
    }, [selectedCategory, selectedPage, reloadProducts])


    const handlePageChange = (data) => {
        setSelectedPage(data.selected)
    }

    return (
        <>
            <div className="mt-2">
                
                <div className="">
                    {
                        allProducts && allProducts.map(product => (
                            <AdminSingleProduct key={product._id} productId={product._id} setReloadProducts={setReloadProducts}/>
                        ))
                    }
                </div>
                {
                    totalData > 20 && (
                        <div className="mt-2">
                            <ReactPaginate 
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                pageCount={Math.ceil(totalData/20)}
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
        </>
    )
}

export default AllProducts