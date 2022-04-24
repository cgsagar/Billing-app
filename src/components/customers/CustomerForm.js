import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const CustomerForm = (props) => {

    const { formSubmit, togglePopup, name: customerName, mobile: customerNumber, email: customerMail } = props

    const LoginSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, "Username must be 4 characters at minimum")
            .required("Username is required"),
        mobile: Yup.string()
            .min(10, "Mobile number must be 10 characters")
            .required("Mobile Number is required"),
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required")
    });
    const redirect = () => {
        props.history.push('/customers')
    }



    return (

        <div className='popUpWrap'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">

                        <h5 class="modal-title" id="staticBackdropLabel">{customerName ? 'Edit Customer' : 'Add New Customer'}</h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={togglePopup}></button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={
                                {
                                    name: customerName ? customerName : '',
                                    mobile: customerNumber ? customerNumber : '',
                                    email: customerMail ? customerMail : ''
                                }}
                            validationSchema={LoginSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                //alert("Form is validated! Submitting the form...");
                                formSubmit(values)
                            }}
                        >
                            {({ touched, errors, isSubmitting, values }) =>
                                !isSubmitting && (
                                    <div>
                                        <Form>

                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter the name"
                                                    autoComplete="off"
                                                    className={`mt-2 form-control
                          ${touched.name && errors.name ? "is-invalid" : ""}`}
                                                />

                                                <ErrorMessage
                                                    component="div"
                                                    name="name"
                                                    className="invalid-feedback"
                                                />
                                            </div>

                                            <div className="form-group">

                                                <Field
                                                    type="number"
                                                    name="mobile"
                                                    placeholder="Enter your mobile number"
                                                    autoComplete="off"
                                                    className={`mt-2 form-control
                          ${touched.mobile && errors.mobile ? "is-invalid" : ""}`}
                                                />

                                                <ErrorMessage
                                                    component="div"
                                                    name="mobile"
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


                                            <button
                                                type="submit"
                                                className="btn btn-success btn-block mt-4 me-3"
                                            >{customerName ? 'Update' : 'Save'}
                                            </button>
                                            <button
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary btn-block mt-4"
                                            >
                                                {customerName ? 'Cancel' : 'Reset'}
                                            </button>


                                        </Form>
                                    </div>
                                )
                            }
                        </Formik>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default CustomerForm