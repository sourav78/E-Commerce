import React from "react";

import {Route, Routes} from 'react-router-dom'

import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import About from "../Pages/About";
import Products from "../Pages/Products";
import ProductDeatails from "../Pages/ProductDeatails";

const PagesRoutes = () => {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Home />}  />
          <Route path="/product" element={<Products />}  />
          <Route path="/details/:productId" element={<ProductDeatails />}  />
          <Route path="/about" element={<About />}  />
          <Route path="/cart" element={<Cart />}  />
        </Routes>
    </>
  );
};

export default PagesRoutes;
