import React, { useEffect, useState } from "react";

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
import Admin from "../Pages/Admin/Admin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminAllProducts from "../Pages/Admin/AdminAllProducts";
import AdminCreateProducts from "../Pages/Admin/AdminCreateProducts";
import AdminOrders from "../Pages/Admin/AdminOrders";
import AdminAllUsers from "../Pages/Admin/AdminAllUsers";
import AdminCreateUsers from "../Pages/Admin/AdminCreateUsers";
import AdminAllCoupons from "../Pages/Admin/AdminAllCoupons";
import AdminCreateCoupons from "../Pages/Admin/AdminCreateCoupons";

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
          <Route path="/admin" element={<Admin />}>
            <Route exact path="" element={<AdminDashboard />}  />
            <Route path="all-products" element={<AdminAllProducts />}  />
            <Route path="create-products" element={<AdminCreateProducts />}  />
            <Route path="orders" element={<AdminOrders />}  />
            <Route path="all-users" element={<AdminAllUsers />}  />
            <Route path="create-users" element={<AdminCreateUsers />}  />
            <Route path="all-coupons" element={<AdminAllCoupons />}  />
            <Route path="create-coupons" element={<AdminCreateCoupons />}  />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  );
};

export default PagesRoutes;
