import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncDeleteBill } from '../../actions/bills'
import ShowBill from './ShowBill'

const BillItem = (props) => {
    const [showPopup, setShowPopup] = useState(false)
    const { id, customerInfo, billInfo } = props
    const dispatch = useDispatch()
    console.log('billItem', props)
    const handleDelete = (id) => {
        const confirmDelete = window.confirm('are you sure?')
        if (confirmDelete) {
            dispatch(asyncDeleteBill(id))
        }

    }

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    return (<>
        <div class="card mb-3">
            <div class="d-flex justify-content-between p-3">
                {customerInfo && <div> {customerInfo.name} - {customerInfo.mobile}</div>}

                <div >
                    <button type="button" class="btn btn-primary" onClick={togglePopup} >View</button>
                    <button type="button" class="btn btn-danger mx-3" onClick={() => handleDelete(id)}>Delete</button>
                </div>
            </div>

        </div>
        {showPopup && <ShowBill togglePopup={togglePopup} customerInfo={customerInfo} billInfo={billInfo} />}
    </>)
}
export default BillItem