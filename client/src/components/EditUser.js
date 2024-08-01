import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState, } from "react";
//import ContentContainer from "./ContentContainer";
//import {  useNavigate} from "react-router-dom";
//import { Routes, Route } from "react-router-dom";
//import { useAuth } from "../contexts/AuthContext";

function EditUser({ user: { id, first_name, last_name, email, zipcode, phone}, onEdit }) {
    const [errors, setErrors] = useState([]);
    const formik = useFormik({
        initialValues: {
            id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            zipcode: zipcode,
            phone: phone,
            public: false,
        },
        validationSchema: yup.object().shape({
            email: yup
                .string().email("Email must be a valid email address")
                .required("Required"),
            first_name: yup.string().required("Required"),
            last_name: yup.string().required("Required"),
            zipcode: yup.string().required("Required").matches(/^\d{5}$/, "Zip code must be 5 digits long"),
            phone: yup.string().required("Required").matches(/^\d{10}$/, "Phone number must be 10 digits long"),
            public: yup.boolean().required("Required")
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                setErrors([]);
                
                const response = await fetch("/users/" + id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
            
                if (response.ok) {
                    const user = await response.json();
                    onEdit(user); fetch("/profile/");
                } else {
                    const errorData = await response.json();
                    setErrors(errorData);
                }
            } catch (error) {
                console.error("Error updating:", error);
                setErrors([{ message: "An error occurred while updating profilee. Please try again later." }]);
            }
        }
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email} />
                    {formik.errors.email && formik.touched.email ? (
                        <p className="error">{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className="input-container">
                    <input
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
                <div className="input-container">
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                    />
                </div>
                {formik.errors.last_name && formik.touched.last_name ? (
                    <p className="error">{formik.errors.last_name}</p>
                ) : null}
                <div className="input-container">
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                        <p className="error">{formik.errors.phone}</p>
                    ) : null}
                </div>
                <div className="input-container">
                <input
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
                <div id="submit-button">
                    <button type="submit">
                        Update
                    </button>
                </div>
                <div id="errors">{errors.error}</div>
            </form></>)
}
export default EditUser
