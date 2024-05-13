import React from "react";
import AllOrders from "../../components/profile/orders/AllOrders";

const Orders = () => {
    return (
        <>
            <div className="bg-white py-8 px-8">
                <p className="text-xl font-semibold">Your Orders</p>
                <div className="mt-4">
                    <AllOrders/>
                </div>
            </div>
        </>
    );
};

export default Orders;
