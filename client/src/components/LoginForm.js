import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {
    const [errors, setErrors] = useState([]);
    const { login } = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .email("Email must be a valid email address")
                .required("Required"),
            password: yup
                .string()
                .min(8, "Password must be at least 8 characters long")
                .required("Required"),
            //.matches(
            //    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            //    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }),
        onSubmit: async (values) => {
            try {
                setErrors([]);
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    const user = await response.json();
                    login(user);
                    navigate("/userprofile");
                } else {
                    const errorData = await response.json();
                    setErrors(errorData.errors);
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
    return (
        <div className="login-form-container">
            <div>
                <form className="login-form" onSubmit={formik.handleSubmit}>
                    <h3 className="login-header">Box Office</h3>
                    <div className="input-email">
                        E-mail
                        <input
                            className="email-input"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="current-email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <p className="error">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="input-container-password">
                        Password
                        <input
                            className="email-input"
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            autoComplete="current-password"
                            //placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <p className="error">{formik.errors.password}</p>
                        ) : null}
                    </div>
                    <div className="input-container-submit">
                        <button className="submit-button" type="submit">
                            Admit One
                        </button>
                    </div>
                    <div id="errors">
                        {errors.error}
                        {errors.map((error, index) => (
                            <p key={index} className="error">
                                {error.message}
                            </p>
                        ))}
                    </div>
                    <div>
                        <NavLink
                            className="input-container-registerlink"
                            to="../registercontainer">
                            Create an Account
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default LoginForm;
