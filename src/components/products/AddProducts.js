import React from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { asyncProduct } from "../../actions/products";

const AddProduct = (props) => {

    const { togglePopup } = props

    const dispatch = useDispatch()

    const formSubmit = (product) => {
        dispatch(asyncProduct(product, togglePopup))
    }

    return (
        <div>
            <ProductsForm formSubmit={formSubmit} togglePopup={togglePopup} />
        </div>
    )
}

export default AddProduct