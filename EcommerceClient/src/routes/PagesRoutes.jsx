import React from "react";

import {Route, Routes} from 'react-router-dom'

import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import About from "../Pages/About";
import Products from "../Pages/Products";
import ProductDeatails from "../Pages/ProductDeatails";
import Login from "../Pages/authentication/Login";
import Register from "../Pages/authentication/Register";
import Profile from "../Pages/profile/Profile";
import PersonalInformation from "../Pages/profile/PersonalInformation";
import Address from "../Pages/profile/Address";
import Orders from "../Pages/profile/Orders";
import Wishlist from "../Pages/profile/Wishlist";
import Checkout from "../Pages/Checkout";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PageNotFound from "../Pages/PageNotFound";

const PagesRoutes = () => {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Home />}  />
          <Route path="/product" element={<Products />}  />
          <Route path="/details/:productId" element={<ProductDeatails />}  />
          <Route path="/about" element={<About />}  />
          <Route path="/cart" element={<Cart />}  />
          <Route path="/login" element={<Login />}  />
          <Route path="/register" element={<Register />}  />
          <Route path="/profile" element={<Profile />}>
            <Route exact path="" element={<PersonalInformation />}  />
            <Route path="address" element={<Address />}  />
            <Route path="orders" element={<Orders />}  />
            <Route path="wishlist" element={<Wishlist />}  />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  );
};

export default PagesRoutes;
