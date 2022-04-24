import axios from "../config/axios";

// Get all the tasks list using GET request
export const startGetCustomers = () => {
    return (dispatch) => {
        axios.get('/customers', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const customer = res.data
                console.log(customer)
                dispatch(setCustomers(customer))
                //dispatch(toggleLoading())
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const setCustomers = (customer) => {
    return {
        type: 'SET_CUSTOMER',
        payload: customer
    }
}



// Adding the Customer data
export const asyncCustomer = (newcustomer, togglePopup) => {
    return (dispatch) => {
        axios.post('/customers', newcustomer, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const customerdata = res.data

                if (customerdata.hasOwnProperty('errors')) {
                    alert('Error message', customerdata.errors.name.message)
                    //dispatch(errHandle(customerdata.errmsg))
                } else {
                    dispatch(addCustomers(customerdata))
                    togglePopup()
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const addCustomers = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer
    }
}


//Editing the customer data
export const asyncEditCustomer = (formData, oldId, togglePopup) => {
    return (dispatch) => {
        axios.put(`/customers/${oldId}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const customerdata = res.data
                //console.log('customerdata', customerdata)
                dispatch(editCustomers(customerdata))
                togglePopup()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

const editCustomers = (id) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: id
    }
}



//Delete the Customer Data
export const deleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const customerdata = res.data
                console.log('customerdata', customerdata._id)
                dispatch(delCustomer(customerdata._id))
                //dispatch(toggleLoading())
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const delCustomer = (id) => {
    return {
        type: 'DELETE_CUSTOMER',
        payload: id
    }
}


