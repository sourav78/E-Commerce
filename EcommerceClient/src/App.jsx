import React, { useEffect } from "react";
import "./App.css";


import NavBar from "./components/NavBar";
import PagesRoutes from "./routes/PagesRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateIsAuthenticated, updateUser } from "./redux_slicer/EcomSlicer";

const App = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const trigger = useSelector(state => state.ecom.trigger)

    const location = useLocation();
    
    const hideNavBarPaths = ["/admin", "/login", "/register"];

    const shouldHideNavBar = hideNavBarPaths.some(path =>
        location.pathname.startsWith(path)
    );

    useEffect(() => {
        async function authenticateUser(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
                    withCredentials: true
                })
                const {data} = response.data
                dispatch(updateIsAuthenticated(true))
                dispatch(updateUser(data))
            } catch (error) {
                console.log(error.response.data.msg);
                dispatch(updateIsAuthenticated(false))
                dispatch(updateUser({}))
                navigate('/')
            }
        }

        authenticateUser()
    }, [trigger])

  return (
    <>
      <div className=" min-h-screen">
        {!shouldHideNavBar && <NavBar />}
        <PagesRoutes/>
      </div>
    </>
  );
};

export default App;
