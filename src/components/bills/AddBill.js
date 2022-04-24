import React from 'react'
import BillForm from './BillForm'
import { useDispatch } from 'react-redux'
import { asyncAddBill } from '../../actions/bills'
import { withRouter } from 'react-router-dom';


const AddBill = (props) => {
    const { togglePopup } = props

    const dispatch = useDispatch()



    const redirect = (id) => {
        //alert(id)
        props.history.push(`/billdetails/${id}`)
    }


    const formSubmit = (formData, togglePopup) => {
        dispatch(asyncAddBill(formData, togglePopup, redirect))
    }

    return <>
        <BillForm togglePopup={togglePopup} formSubmit={formSubmit} />
    </>
}

export default withRouter(AddBill)
