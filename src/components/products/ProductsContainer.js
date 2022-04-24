import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import { useSelector, useDispatch } from "react-redux";
import { startGetProducts } from "../../actions/products";
import AddProducts from "./AddProducts";

const ProductsContainer = (props) => {

    const [showPopup, setshowPopup] = useState(false);

    const togglePopup = () => {
        setshowPopup(!showPopup);
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetProducts())
    }, [])

    return (
        <div>
            {showPopup && (
                <AddProducts togglePopup={togglePopup} />
            )}
            <ProductsList togglePopup={togglePopup} />
        </div>
    )
}

export default ProductsContainer