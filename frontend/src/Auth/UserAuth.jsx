import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/user.context'

const UserAuth = ({children}) => {
    const [loading,setLoading] = useState(true);
    const {user} = useContext(UserContext);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }

        if(!token){
            navigate('/login')
        }
        if(loading){
            <div>Loading...</div>
        }
        if(user){
            setLoading(false);
        }

    },[])

  return (
    <>
        {children}
    </>
  )
}

export default UserAuth
