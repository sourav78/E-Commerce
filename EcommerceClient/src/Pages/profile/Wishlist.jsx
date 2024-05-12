import React from "react";
import { AllWishlist } from "../../components/profile/wishlist/AllWishlist";

const Wishlist = () => {
    return (
        <>
            <div className="bg-white py-8 px-8">
                <p className="text-xl font-semibold">Wishlist</p>
                <div className="mt-4">
                    <AllWishlist/>
                </div>
            </div>
        </>
    );
};

export default Wishlist;
