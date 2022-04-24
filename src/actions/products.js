import axios from "../config/axios";

// Get all the products list using GET request
export const startGetProducts = () => {
    return (dispatch) => {
        axios.get('/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const product = res.data
                console.log(product)
                dispatch(setProducts(product))
                //dispatch(toggleLoading())
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const setProducts = (product) => {
    return {
        type: 'SET_PRODUCT',
        payload: product
    }
}



// Adding the Customer data
export const asyncProduct = (newproduct, togglePopup) => {
    return (dispatch) => {
        axios.post('/products', newproduct, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const productdata = res.data
                //console.log('customerdata', customerdata)
                dispatch(addProducts(productdata))
                togglePopup()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const addProducts = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}


//Editing the customer data
export const asyncEditProduct = (formData, oldId, togglePopup) => {
    return (dispatch) => {
        axios.put(`/products/${oldId}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const productdata = res.data
                //console.log('customerdata', customerdata)
                dispatch(editProducts(productdata))
                togglePopup()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

const editProducts = (id) => {
    return {
        type: 'EDIT_PRODUCT',
        payload: id
    }
}



//Delete the Customer Data
export const deleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const productdata = res.data
                //console.log('productdata', productdata._id)
                dispatch(delProduct(productdata._id))
                //dispatch(toggleLoading())
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const delProduct = (id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: id
    }
}