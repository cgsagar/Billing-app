import React from "react";
import CustomerForm from "./CustomerForm";
import { useDispatch } from "react-redux";
import { asyncCustomer } from "../../actions/customers";

const AddCustomer = (props) => {

    const { togglePopup } = props

    const dispatch = useDispatch()

    const formSubmit = (customer) => {
        dispatch(asyncCustomer(customer, togglePopup))
    }

    return (
        <div>
            <CustomerForm formSubmit={formSubmit} togglePopup={togglePopup} />
        </div>
    )
}

export default AddCustomer