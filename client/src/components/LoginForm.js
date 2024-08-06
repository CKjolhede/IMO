import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


//function LoginForm({ onSignUp}) {
function LoginForm() {
    const [errors, setErrors] = useState([]);
    const {  login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                setErrors([]);
                const  response = await fetch("/login", {
                
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }); 
                if (response.ok) {
                    const user = await response.json();
                    login(user);
                    navigate("/home/");
                } else {
                    const errorData = await response.json();
                    setErrors(errorData);
                }
            } catch (error) {
                setErrors([
                    {
                        message:
                            "You have entered an invalid email or password.",
                    },
                ]);
            }
        },
    });
    return (<div>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <div className="input-container">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p className="error">{formik.errors.email}</p>
                    ) : null}
                </div>

                <div className="input-container">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <p className="error">{formik.errors.password}</p>
                    ) : null}
                </div>

                <div className="input-container">
                    <button type="submit">Submit</button>
                </div>
                <div id="errors">{errors.error}</div>
            </div>
    
        </form><button >
        <NavLink to="../registercontainer">Create an Account</NavLink> 
        </button>
    </div> );
}
export default LoginForm;
