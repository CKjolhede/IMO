import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

function LoginFormContainer() { 
    const navigate = useNavigate();
    return (
        <div className="login-form-container">
            <LoginForm />
            <button
                className="button-login"
                onClick={() => navigate("/home")}
            >
                Create an Account
            </button>   
            <section className="login-form-container"></section>
        </div>
    );
}

export default LoginFormContainer;