import { useFormik } from "formik";
import * as yup from "yup";
import Modal from "./ProfileModal";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import defaultProfilePic from "./images/imo_emu.png";


function EditUser(handleImageClick, handleImageSelect, isModalOpen) {
    const { user, onEdit } = useAuth();
    const [errors, setErrors] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageUrl = baseUrl + user.image;
    const formatPhone = (phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    };
    
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
            email: yup.string().required("Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email must be a valid email address"),
            first_name: yup.string().required("Required"),
            last_name: yup.string().required("Required"),
            zipcode: yup.string().required("Required").matches(/^\d{5}$/, "Zip code must be 5 digits long"),
            phone: yup.string().required("Required").matches(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/, "Phone number must be 10 digits long"),
        }),
        onSubmit: async (values) => {
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
                setErrors([{ message: "Email already in use. Please use a different email." }]);
            }
        }
    });

    return (
        <>
            <div className="edituser-container">
                <div className="edituser-card">
                    <img
                        className="edituser-profilepic"
                        src={defaultProfilePic}
                        name="profilePic"
                        alt="ProfileImage"
                        //onClick={handleImageClick}
                    />
                    {isModalOpen && <Modal onSelectImage={handleImageSelect} />}

                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-container-firstname">
                            <input
                                className="input-email"
                                id="first_name"
                                name="first_name"
                                type="text"
                            
                                placeholder="First Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name}
                                autoComplete="on"
                            />
                            {formik.errors.first_name &&
                            formik.touched.first_name ? (
                                <p className="error">
                                    {formik.errors.first_name}
                                </p>
                            ) : null}
                        </div>
                        <div className="input-container-lastname">
                            <input
                                className="input-email"
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.last_name}
                                autoComplete="on"
                            />
                            {formik.errors.last_name &&
                            formik.touched.last_name ? (
                                <p className="error">
                                    {formik.errors.last_name}
                                </p>
                            ) : null}
                        </div>
                        <div className="input-container-email">
                            <input
                                className="input-email"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                autoComplete="off"
                            />
                            
                            {formik.errors.email && formik.touched.email ? (
                                <p className="error">{formik.errors.email}</p>
                            ) : null}
                        </div>
                        <div className="input-container-phone">
                            <input
                                className="input-email"
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="Phone Number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                autoComplete="on"
                            />
                            {formik.errors.phone && formik.touched.phone ? (
                                <p className="error">{formik.errors.phone}</p>
                            ) : null}
                        </div>
                        <div className="input-container">
                            <input
                                className="input-email"
                                id="zipcode"
                                name="zipcode"
                                type="text"
                                placeholder="ZipCode"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.zipcode}
                                autoComplete="on"
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
                </div>
                    <p style={{color: "red" }}>userID: {user.id}</p>
            </div>
        </>
    );
}

export default EditUser;
