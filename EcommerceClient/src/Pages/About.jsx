import React, { useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";

const About = () => {

    const [toggle, setToggle] = useState(false)

    return (
      <>
           <div className="">
                <div className="lg:w-1/3 sm:w-1/2 w-[80%] m-auto mt-8 p-4 bg-white rounded-md shadow-md">
                    {
                        toggle ? (
                            <div className="">
                                <div className="">
                                    <h1 className="sm:text-3xl text-2xl font-semibold text-center">About Me</h1>
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <div className="sm:w-1/3 w-1/2 rounded-full overflow-hidden">
                                        <img src="https://media.licdn.com/dms/image/C4E03AQGWlCJwg7qszg/profile-displayphoto-shrink_800_800/0/1658448726766?e=1721865600&v=beta&t=V_rTE9H8qKbPGohsHIzQBJL75sJPd8Iu64NDLRmRVRo" alt="" />
                                    </div>
                                </div>
                                <div className="mt-4 w-[80%] m-auto">
                                    <p className="text-lg text-gray-500 text-center font-semibold">Sourava Ranjan Sahoo</p>
                                    <p className="mt-2 text-gray-500 text-center ">Hi, I am Sourav Ranjan Sahoo, a full-stack web developer passionate about crafting seamless digital experiences from front-end to back-end. 💻</p>
                                </div>
                                <div className="mt-4 flex items-center gap-2 w-[80%] m-auto justify-center">
                                    <span>Follow Me :-</span>
                                    <div className=" flex items-center gap-2">
                                        <a target="_blank" href="https://www.linkedin.com/in/sourava-ranjan-sahoo-583066246"><FaLinkedin className="text-2xl"/></a>
                                        <a target="_blank" href="https://x.com/iam_julu"><FaSquareXTwitter className="text-2xl"/></a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="">
                                <div className="">
                                    <h1 className="sm:text-3xl text-2xl font-semibold text-center">About Project</h1>
                                </div>
                                <div className="mt-4 w-[90%] m-auto">
                                    <p className="mt-2 text-gray-500 text-justify">Welcome to S78 Store, an innovative e-commerce application designed to provide users with a seamless shopping experience. At S78 Store, customers can browse a wide variety of products, place orders, save their favorite items to a wishlist, and apply coupons for extra discounts. The app also features a profile section where users can update their personal information, including their profile picture.</p>
                                    <p className="mt-2 text-gray-500 text-justify">Our platform is not only user-friendly but also equipped with a robust admin panel. The admin panel offers comprehensive store analytics and allows administrators to create and manage users, products, and coupons efficiently. Additionally, it features an order management section, ensuring smooth and efficient operations.</p>
                                    
                                </div>
                                <div className="mt-4 w-[90%] m-auto flex items-center gap-2" >
                                    <p className="text-lg font-semibold">Tech Stack :-</p>
                                    <div className="flex items-center gap-2">
                                        <SiMongodb className="text-2xl"/>
                                        <SiExpress className="text-2xl"/>
                                        <FaReact className="text-2xl"/>
                                        <FaNode className="text-3xl"/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={() => setToggle(!toggle)}
                        className="bg-gray-200 px-2 py-2 rounded font-semibold hover:bg-gray-300 transition-all"
                        >{toggle? "About Project" : "About Me"}</button>
                    </div>
                </div>
           </div>
      </>
    );
};

export default About;
