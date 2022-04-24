import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const ProductsForm = (props) => {

    const { formSubmit, togglePopup, name: productName, price: productPrice } = props

    const LoginSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, "Username must be 4 characters at minimum")
            .required("Username is required"),
        price: Yup.string()
            .required("Price is required")
    });



    return (

        <div className='popUpWrap'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">

                        <h5 class="modal-title" id="staticBackdropLabel">{productName ? 'Edit Product' : 'Add New Product'}</h5>



                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={togglePopup}></button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={
                                {
                                    name: productName ? productName : '',
                                    price: productPrice ? productPrice : ''

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
                                                    name="price"
                                                    placeholder="Enter the price"
                                                    autoComplete="off"
                                                    className={`mt-2 form-control
                          ${touched.price && errors.price ? "is-invalid" : ""}`}
                                                />

                                                <ErrorMessage
                                                    component="div"
                                                    name="price"
                                                    className="invalid-feedback"
                                                />
                                            </div>


                                            <button
                                                type="submit"
                                                className="btn btn-success btn-block mt-4 me-3"
                                            >{productName ? 'Update' : 'Save'}
                                            </button>
                                            <button
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary btn-block mt-4"
                                            >
                                                {productName ? 'Cancel' : 'Reset'}
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
export default ProductsForm