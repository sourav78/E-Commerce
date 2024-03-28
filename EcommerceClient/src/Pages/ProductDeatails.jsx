import React from "react";
import { useParams } from "react-router-dom";

const ProductDeatails = () => {

    const {productId} = useParams()

  return (
    <>
        <div className="">
            product deatils
            {
                console.log(productId)
            }
        </div>
    </>
  );
};

export default ProductDeatails;
