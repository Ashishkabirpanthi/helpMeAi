import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/user.context'

const UserAuth = ({children}) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      if(!user){
        navigate('/login');
        return;
      }
    };

    fetchProjects();
  }, [navigate]);


  return (
    <>
        {children}
    </>
  )
}

export default UserAuth
