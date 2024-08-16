import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";


function EditUser() {
    const { user, onEdit } = useAuth();
    const [errors, setErrors] = useState([]);
    
    const formik = useFormik({
        initialValues: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            zipcode: user.zipcode,
            phone: user.phone,
        },
        validationSchema: yup.object().shape({
            email: yup
                .string().email("Email must be a valid email address")
                .required("Required"),
            first_name: yup.string().required("Required"),
            last_name: yup.string().required("Required"),
            zipcode: yup.string().required("Required").matches(/^\d{5}$/, "Zip code must be 5 digits long"),
            phone: yup.string().required("Required").matches(/^\d{10}$/, "Phone number must be 10 digits long"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                setErrors([]);
                
                const response = await fetch("/users/" + user.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    const user = await response.json();
                    onEdit(user);
                } else {
                    const errorData = await response.json();
                    setErrors(errorData);
                }
            } catch (error) {
                setErrors([{ message: "An error occurred while updating profile. Please try again later." }]);
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
                        value={formik.values.email}
                    />
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
                    {formik.errors.last_name && formik.touched.last_name ? (
                        <p className="error">{formik.errors.last_name}</p>
                    ) : null}
                </div>
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
                    <button type="submit" className="submit-button">
                        Update
                    </button>
                </div>
                {errors.length > 0 && (
                    <div id="errors">
                        {errors.map((error, index) => (
                            <p key={index} className="error">
                                {error.message}
                            </p>
                        ))}
                    </div>
                )}
            </form>
        </>
    );
}

export default EditUser;
