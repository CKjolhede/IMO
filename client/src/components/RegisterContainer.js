import React from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

function RegisterContainer ({ setReg }) { 
    const navigate = useNavigate();
    
    return (
            <div>
            <Register />
            <button
                className="login-btn"
                onClick={() => {
                    setReg();
                    navigate("/home");
                }}
            >
                Already have an Account
            </button>   
            </div >
            )

}
    
export default RegisterContainer;