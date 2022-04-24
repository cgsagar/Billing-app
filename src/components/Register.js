import React from "react";
import { Link } from 'react-router-dom'
import registerimg from "../assets/register.gif"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postUsers } from "../actions/users.js"

import * as Yup from "yup";

const Register = (props) => {

    const dispatch = useDispatch();

    const redirect = () => {
        props.history.push('/login')
    }

    const RegisterSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, "Username must be 4 characters at minimum")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be 8 characters at minimum")
            .required("Password is required"),
        businessName: Yup.string()
            .required("Business Name is required"),
        address: Yup.string()
            .required("Address is required")
    });


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-5">
                    <Formik
                        initialValues={
                            {
                                username: "",
                                email: "",
                                password: "",
                                businessName: "",
                                address: ""
                            }}
                        validationSchema={RegisterSchema}


                        onSubmit={(values) => {
                            console.log(values);
                            //alert("Form is validated! Submitting the form...");
                            dispatch(postUsers(values, redirect))
                        }}
                    >
                        {({ touched, errors, isSubmitting, values }) =>

                            <div>
                                <div className="row mb-2">
                                    <div className="col-lg-12 text-center">
                                        <h1 className="mt-5">Registration Form</h1>
                                    </div>
                                </div>
                                <Form>

                                    <div className="form-group">
                                        <Field
                                            type="text"
                                            name="username"
                                            placeholder="Enter name of the user"
                                            autoComplete="off"
                                            className={`mt-2 form-control
                          ${touched.username && errors.username ? "is-invalid" : ""}`}
                                        />

                                        <ErrorMessage
                                            component="div"
                                            name="username"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">

                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            autoComplete="off"
                                            className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        />

                                        <ErrorMessage
                                            component="div"
                                            name="email"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">

                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            autoComplete="off"
                                            className={`mt-2 form-control
                          ${touched.password && errors.password ? "is-invalid" : ""}`}
                                        />

                                        <ErrorMessage
                                            component="div"
                                            name="password"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">

                                        <Field
                                            type="businessName"
                                            name="businessName"
                                            placeholder="Enter Business Name"
                                            autoComplete="off"
                                            className={`mt-2 form-control
                          ${touched.businessName && errors.businessName ? "is-invalid" : ""}`}
                                        />

                                        <ErrorMessage
                                            component="div"
                                            name="businessName"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">

                                        <Field
                                            type="address"
                                            name="address"
                                            placeholder="Enter Your Address"
                                            className={`mt-2 form-control
                          ${touched.address && errors.address
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="address"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <p className="pt-3">Already registered? <Link to="/login">Login</Link></p>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    >
                                        Register
                                    </button>


                                </Form>
                            </div>

                        }
                    </Formik>
                </div>
                <div className="col-md-7">
                    <img className="img-fluid w-100" src={registerimg} alt="Registration" />
                </div>
            </div>
        </div >
    )
}

export default Register