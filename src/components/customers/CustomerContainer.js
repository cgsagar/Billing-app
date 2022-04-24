import React, { useEffect, useState } from "react";
import CustomerList from "./CustomerList";
import { useDispatch } from "react-redux";
import { startGetCustomers } from "../../actions/customers";
import AddCustomer from "./AddCustomer";

const CustomerContainer = (props) => {

    const [showPopup, setshowPopup] = useState(false);

    const togglePopup = () => {
        setshowPopup(!showPopup);
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetCustomers())
    }, [])


    return (
        <div>
            {showPopup && (
                <AddCustomer togglePopup={togglePopup} />
            )}
            <CustomerList togglePopup={togglePopup} />

        </div>
    )
}

export default CustomerContainer