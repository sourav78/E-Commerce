import React, { useEffect, useState } from 'react'
import SingleCoupon from './SingleCoupon'
import axios from 'axios'

const AllCoupons = () => {

    const [coupons, setCoupons] = useState([])

    const [reloadCoupon, setReloadCoupon] = useState(false)

    useEffect(() => {
        async function fetchAllCoupons(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-all-coupons`)

                const {data} = response

                data.success && setCoupons(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllCoupons()
    }, [reloadCoupon])

    return (
        <>
            <div className="mt-2">
                {
                    coupons ? (
                        coupons.map(coupon => (
                            <SingleCoupon coupon={coupon} setReloadCoupon={setReloadCoupon}/>
                        ))
                    ) : (
                        <></>
                    )
                }
            </div>
        </>
    )
}

export default AllCoupons