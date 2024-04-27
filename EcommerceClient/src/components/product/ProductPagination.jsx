import React from "react";
import ReactPaginate from 'react-paginate'

const ProductPagination = ({totalData, setSelectedPage}) => {

    const handlePageChange = (data) => {
        console.log(data.selected);
        setSelectedPage(data.selected)
    }

    return (
        <>
            <ReactPaginate 
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={Math.ceil(totalData/12)}
                onPageChange={handlePageChange}
                containerClassName=" flex justify-center gap-2"
                pageClassName="border-2 border-green-400 px-4 py-2 rounded"
                pageLinkClassName=""
                previousClassName="border-2 border-green-400 px-4 py-2 rounded bg-green-400"
                previousLinkClassName=""
                nextClassName="border-2 border-green-400 px-4 py-2 rounded  bg-green-400"
                nextLinkClassName=""
                breakClassName="px-2 py-2 text-xl"
                breakLinkClassName=""
                activeClassName="border-2 border-green-400 px-4 py-2 rounded bg-green-400"
                activeLinkClassName=""
            />
        </>
    );
};

export default ProductPagination;
