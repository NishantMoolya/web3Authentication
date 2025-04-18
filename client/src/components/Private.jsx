import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; 

const Private = ({ children }) => {
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate()

    if (!userData.auth) {
        navigate('/login');
    }
  
    return children;
};

export default Private;
