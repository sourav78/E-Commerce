import React from 'react'
import pageError from '../assets/404-error.png'

const PageNotFound = () => {
    return (
        <>
            <div className="">
                <div className="mt-4 flex flex-col items-center">
                    <img className='lg:w-[20%] sm:w-[30%] w-[50%]' src={pageError} alt="" />
                    <p className='sm:text-5xl text-4xl font-bold'>PAGE NOT FOUND</p>
                </div>
            </div>   
        </>
    )
}

export default PageNotFound