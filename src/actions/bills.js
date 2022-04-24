import axios from "../config/axios";

//GET Bills

export const asyncGetBills = () => {
    return (dispatch) => {
        axios.get('/bills', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const result = res.data
            dispatch(getBills(result))
        }).catch((err) => {
            alert(err.message)
        })
    }
}

const getBills = (bills) => {
    return {
        type: 'GET_BILLS',
        payload: bills
    }
}



const getCustomerByID = (customer) => {
    return {
        type: 'GET_CUSTOMER_BY_ID',
        payload: customer
    }
}

//Add bill

export const asyncAddBill = (formData, togglePopup, redirectUrl) => {
    return (dispatch) => {
        axios.post('/bills', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const result = res.data
            if (result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                alert('Successfully Bill genarated')
                //console.log('new added bill', result)
                dispatch(addBill(result))
                togglePopup()
                redirectUrl(result._id)
                //history.push(`/billdetail/${result._id}`)
            }

        }).catch((err) => {
            alert(err.message)
        })
    }
}

const addBill = (bill) => {
    return {
        type: 'ADD_BILL',
        payload: bill
    }
}

//Delete Bill
export const asyncDeleteBill = (id) => {
    return (dispatch) => {
        axios.delete(`/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const result = res.data
            console.log('deleted bill', result)
            dispatch(deleteBill(result._id))
        }).catch((err) => {
            alert(err.message)
        })
    }
}

const deleteBill = (id) => {
    return {
        type: 'DELETE_BILL',
        payload: id
    }
}

//Get bill by id

export const asyncgetBillinfoByid = (id) => {
    //alert(id)
    return (dispatch) => {
        axios.get(`/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const result = res.data
            console.log('asyncgetBillinfoByid action', result)
            dispatch(getBillById(result))
        }).catch((err) => {
            alert(err.message)
        })
    }
}

const getBillById = (bill) => {
    return {
        type: 'GET_BILL_BY_ID',
        payload: bill
    }
}