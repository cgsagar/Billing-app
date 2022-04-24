import React, { useState } from "react";

import { useDispatch } from 'react-redux'
import EditProduct from "./EditProduct"
import { deleteProduct } from "../../actions/products";

const ProductsItem = (props) => {

    const [showPopup, setShowPopup] = useState(false)

    const { product } = props

    const togglePopup = () => setShowPopup(!showPopup)

    const dispatch = useDispatch()

    const handleRemove = (id) => {
        const confirmRemove = window.confirm("Are you sure?")
        if (confirmRemove) {
            dispatch((deleteProduct(id)))
        }
    }

    return (
        <>
            <div class="card mb-3">
                <div class="d-flex justify-content-between p-3">
                    <div >
                        {product.name} - {product.price}
                    </div>
                    <div >
                        <button type="button" class="btn btn-secondary" onClick={togglePopup}>Edit</button>
                        <button type="button" class="btn btn-danger mx-3" onClick={() => handleRemove(product._id)}>Delete</button>
                    </div>
                </div>
            </div>
            {showPopup && <EditProduct togglePopup={togglePopup} product={product} />}
        </>
    )
}

export default ProductsItem