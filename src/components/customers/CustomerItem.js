import React, { useState } from "react";

import { useDispatch } from 'react-redux'
import EditCustomer from "./EditCustomer"
import { deleteCustomer } from "../../actions/customers";

const CustomerItem = (props) => {

    const [showPopup, setShowPopup] = useState(false)

    const { customer } = props

    const togglePopup = () => setShowPopup(!showPopup)

    const dispatch = useDispatch()

    const handleRemove = (id) => {
        const confirmRemove = window.confirm("Are you sure?")
        if (confirmRemove) {
            dispatch((deleteCustomer(id)))
        }
    }

    return (
        <>
            <div class="card mb-3">
                <div class="d-flex justify-content-between p-3 align-items-center">
                    <div>
                        <p>Name- {customer.name}</p>
                        <p>Mob.no- {customer.mobile}</p>
                        <p>Email - {customer.email}</p>
                    </div>
                    <div >
                        <button type="button" class="btn btn-secondary" onClick={togglePopup}>Edit</button>
                        <button type="button" class="btn btn-danger mx-3" onClick={() => handleRemove(customer._id)}>Delete</button>
                    </div>
                </div>
            </div>
            {showPopup && <EditCustomer togglePopup={togglePopup} customer={customer} />}
        </>
    )
}

export default CustomerItem