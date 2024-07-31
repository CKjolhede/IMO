import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

function LoginFormContainer( {setReg} ) { 
    const navigate = useNavigate();
    return (
            <div>
            <LoginForm />
            <button
                className="login-btn"
                onClick={() => {
                    setReg();
                    navigate("/home");
                }}
            >
                Create an Account
            </button>   
            </div >
            )
}
    
export default LoginFormContainer;