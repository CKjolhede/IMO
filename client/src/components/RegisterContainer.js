import React from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

function RegisterContainer () { 
    const navigate = useNavigate();
    
    return (
            <div>
            <Register />
            <button
                className="login-btn"
                onClick= {                navigate("/LoginContainer")
                }
            >Already have an Account
            </button>   
            </div >
            )

}
    
export default RegisterContainer;