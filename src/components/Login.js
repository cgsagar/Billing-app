import React from "react";
import { Link } from 'react-router-dom'
import loginimg from "../assets/login.png"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../actions/users"
import * as Yup from "yup";

const Login = (props) => {


    const dispatch = useDispatch();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be 8 characters at minimum")
            .required("Password is required")
    });



    const redirect = (url) => {

        props.history.push(url)
    }

    // const errorsField = useSelector((state) => {
    //     return state.user.users.errors
    // })
    // alert('Server side errors', errorsField);


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-5">
                    <Formik
                        initialValues={
                            {
                                email: "",
                                password: "",
                            }}
                        validationSchema={LoginSchema}

                        onSubmit={(values) => {
                            //console.log(values);
                            //alert("Form is validated! Submitting the form...");
                            dispatch(postLogin(values, redirect))

                        }}
                    >
                        {({ touched, errors, isSubmitting, values }) =>

                            <div>
                                <div className="row mb-2">
                                    <div className="col-lg-12 text-center">
                                        <h1 className="mt-5">Login</h1>
                                    </div>
                                </div>
                                <Form>

                                    <div className="form-group">

                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                            className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        />
                                        {/* {errorsField && <span className="text-danger">{errorsField} <br /></span>} */}
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
                                            placeholder="Enter your password"
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

                                    <p className="pt-3">New to POS? <Link to="/Register">Register Here</Link></p>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    >
                                        Login
                                    </button>


                                </Form>
                            </div>

                        }
                    </Formik>
                </div>
                <div className="col-md-7">
                    <img className="img-fluid w-100" src={loginimg} alt="Login" />
                </div>
            </div>
        </div >
    )
}

export default Login