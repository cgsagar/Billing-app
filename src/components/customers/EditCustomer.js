import React from "react";
import CustomerForm from "./CustomerForm";
import { useDispatch } from "react-redux";
import { asyncEditCustomer } from "../../actions/customers";

const AddCustomer = (props) => {

    const { togglePopup, customer } = props

    const dispatch = useDispatch()

    const formSubmit = (formdata) => {
        dispatch(asyncEditCustomer(formdata, customer._id, togglePopup))
    }

    return (
        <div>
            <CustomerForm formSubmit={formSubmit} togglePopup={togglePopup} {...customer} />
        </div>
    )
}

export default AddCustomer