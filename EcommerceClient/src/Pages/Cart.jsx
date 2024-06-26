import React, {useState} from "react";
import ProductCart from "../components/Cart/ProductCart";
import PriceDetail from "../components/Cart/PriceDetail";

const Cart = () => {

    const [isCartEmpty, setIsCartEmpty] = useState(false)

    const [reloadOnQuantityUpdate, setReloadOnQuantityUpdate] = useState(true)
    const [totalOrderPrice, setTotalOrderPrice] = useState(0)

    const handleCartEmptyChange = (isEmpty) => {
        setIsCartEmpty(isEmpty);
    };

    return (
        <>
            <div className="relative border-black my-4 lg:w-4/5 sm:w-11/12 w-full px-2 m-auto flex sm:flex-row flex-col gap-4">
                <div className=" border-black flex-1">
                    <ProductCart onCartEmptyChange={handleCartEmptyChange} totalOrderPrice={totalOrderPrice} setReloadOnQuantityUpdate={setReloadOnQuantityUpdate}/>
                </div>
                {
                    !isCartEmpty && (
                        <div className=" border-black sm:w-[32%] w-full relative">
                            <PriceDetail reloadOnQuantityUpdate={reloadOnQuantityUpdate} setTotalOrderPrice={setTotalOrderPrice}/>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default Cart;
