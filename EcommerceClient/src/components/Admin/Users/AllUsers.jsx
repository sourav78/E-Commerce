import React, { useEffect, useState } from 'react'
import SingleUser from './SingleUser'
import axios from 'axios'

const AllUsers = () => {

    const [users, setUsers] = useState([])

    const [reloadUsers, setReloadUser] = useState(false)

    useEffect(() => {
        async function fetchAllCoupons(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-all-users`)

                const {data} = response

                data.success && console.log(data.data);
                data.success && setUsers(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllCoupons()
    }, [reloadUsers])

    return (
        <>
            <div className="mt-2">
                {
                    users ? (
                        users.map(user => (
                            <SingleUser key={user._id} user={user} setReloadUser={setReloadUser}/>
                        ))
                    ) : (
                        <></>
                    )
                }
            </div>   
        </>
    )
}

export default AllUsers