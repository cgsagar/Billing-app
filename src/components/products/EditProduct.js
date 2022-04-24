import React from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { asyncEditProduct } from "../../actions/products";

const AddProduct = (props) => {

    const { togglePopup, product } = props

    const dispatch = useDispatch()

    const formSubmit = (formdata) => {
        dispatch(asyncEditProduct(formdata, product._id, togglePopup))
    }

    return (
        <div>
            <ProductsForm formSubmit={formSubmit} togglePopup={togglePopup} {...product} />
        </div>
    )
}

export default AddProduct