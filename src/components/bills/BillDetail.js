import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PrintBill from './PrintBill'
import { getCustomerinfoById } from '../../selectors/getInfoById'

const BillDetail = (props) => {
    const billid = props.match.params.id
    //alert(billid)

    const userInfo = useSelector((state) => {
        return state.user.users.data
    })

    const productInfo = useSelector((state) => {
        return state.user.products.data
    })

    const customerInfo = useSelector((state) => {
        return state.user.customers.data
    })

    const billData = useSelector((state) => {
        return state.user.bills.data
    })


    const billInfo = billData.find((bill) => {
        return bill._id === billid
    })

    return (

        billData.length > 0 &&
        (<div className='p-3'>
            <PrintBill userInfo={userInfo} productInfo={productInfo} customerInfo={getCustomerinfoById(billInfo.customer, customerInfo)} billInfo={billInfo} />
        </div>)


    )
}

export default BillDetail