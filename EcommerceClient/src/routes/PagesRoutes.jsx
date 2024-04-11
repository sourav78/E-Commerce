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
          <Route path="/profile" element={<Profile />}  />
        </Routes>
    </>
  );
};

export default PagesRoutes;
