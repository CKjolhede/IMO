import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate, NavLink} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Register() {
    const [errors, setErrors] = useState([]);
    const { login } = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password_hash: "",
            first_name: "",
            last_name: "",
            zipcode: "",
            phone: "",
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .email("Email must be a valid email address")
                .required("Required"),
            first_name: yup.string().required("Required"),
            last_name: yup.string().required("Required"),
            password_hash: yup
                .string()
                .min(8, "Password must be at least 8 characters long")
                .required("Required"),
                //.matches(
                //    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                //    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                
            zipcode: yup
                .string()
                .required("Required")
                .matches(/^\d{5}$/, "Zip code must be 5 digits long"),
            phone: yup
                .string()
                .required("Required")
                .matches(/^\d{10}$/, "Phone number must be 10 digits long"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                setErrors([]);
                const response = await fetch("/users", {
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
                        message: "An error occurred while registering. Please try again later.",
                    },
                ]);
            }
        },
    });
    return (
        <div className="reg-form-container">
            <div> 
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="reg-header">Create Account</h3>
                    <div>
                        <input className="reg-input"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="E-MAIL"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <p className="error">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div>
                        <input className="reg-input"
                            id="password_hash"
                            name="password_hash"
                            type="password"
                            placeholder="PASSWORD"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.errors.password_hash &&
                        formik.touched.password_hash ? (
                            <p className="error">{formik.errors.password_hash}</p>
                        ) : null}
                    </div>
                    <div>
                        <input className="reg-input"
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.first_name}
                        />
                        {formik.errors.first_name && formik.touched.first_name ? (
                            <p className="error">{formik.errors.first_name}</p>
                        ) : null}
                    </div>
                    <div>
                        <input className="reg-input"
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_name}
                        />
                        {formik.errors.last_name && formik.touched.last_name ? (
                            <p className="error">{formik.errors.last_name}</p>
                        ) : null}
                    </div>
                    <div>
                        <input className="reg-input"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="000-000-0000"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                            <p className="error">{formik.errors.phone}</p>
                        ) : null}
                    </div>
                    <div>
                        <input className="reg-input"
                            id="zipcode"
                            name="zipcode"
                            type="text"
                            placeholder="ZipCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.zipcode}
                        />
                        {formik.errors.zipcode && formik.touched.zipcode ? (
                            <p className="error">{formik.errors.zipcode}</p>
                        ) : null}
                    </div>
                    <div className="input-container-submit">
                        <button className="submit-button" type="submit">
                            Register
                        </button>
                    </div>
                    <div id="errors">
                        {errors.map((error, index) => (
                            <p key={index} className="error">
                                {error.message}
                            </p>
                        ))}
                    </div>
                    <div>
                        <NavLink
                            className="loginlink"
                            to="../userprofile">
                            Already have an Account
                        </NavLink>      
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
