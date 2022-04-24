const appInitialState = {
    users: { loading: false, data: [], errors: {} },
    customers: { loading: false, data: [], errors: {} },
    products: { loading: false, data: [], errors: {} },
    bills: { loading: false, data: [], errors: {} },
    userLoggedIn: localStorage.getItem('token') ? true : false
}

const rootReducer = (state = appInitialState, action) => {
    switch (action.type) {

        case 'SET_USER': {
            return { ...state, users: { ...state.users, data: action.payload } }
        }

        case 'ADD_USER': return {
            ...state, users: {
                ...state.users, data: [...state.users.data,
                { ...action.payload }]
            }
        }
        case 'ERR_HANDLE': {
            return { ...state, users: { ...state.users, errors: action.payload } }
        }
        case 'LOGIN_USER': {
            return { ...state, userLoggedIn: !state.userLoggedIn }
        }
        case 'LOGGED_OUT': {
            return { ...state, userLoggedIn: !state.userLoggedIn }
        }

        // Setting Up logic for Customer
        case 'SET_CUSTOMER': {
            return { ...state, customers: { ...state.customers, data: [...action.payload] } }
        }
        case 'ADD_CUSTOMER': return {
            ...state, customers: {
                ...state.customers, data: [...state.customers.data,
                { ...action.payload }]
            }
        }
        case 'EDIT_CUSTOMER':
            return {
                ...state, customers: {
                    ...state.customers, data: state.customers.data.map((ele) => {
                        if (ele._id == action.payload._id) {
                            return { ...ele, ...action.payload }
                        } else {
                            return { ...ele }
                        }
                    })
                }
            }
        case 'DELETE_CUSTOMER':
            return {
                ...state, customers: {
                    ...state.customers, data: state.customers.data.filter((ele) => {
                        return ele._id != action.payload
                    })
                }
            }


        // Setting Up logic for Product
        case 'SET_PRODUCT': {
            return { ...state, products: { ...state.products, data: [...action.payload] } }
        }
        case 'ADD_PRODUCT': return {
            ...state, products: {
                ...state.products, data: [...state.products.data,
                { ...action.payload }]
            }
        }
        case 'EDIT_PRODUCT':
            return {
                ...state, products: {
                    ...state.products, data: state.products.data.map((ele) => {
                        if (ele._id == action.payload._id) {
                            return { ...ele, ...action.payload }
                        } else {
                            return { ...ele }
                        }
                    })
                }
            }
        case 'DELETE_PRODUCT':
            return {
                ...state, products: {
                    ...state.products, data: state.products.data.filter((ele) => {
                        return ele._id != action.payload
                    })
                }
            }


        //Setting up logic for bills
        case 'GET_BILLS': return {
            ...state, bills: { ...state.bills, data: [...action.payload] }

        }
        case 'ADD_BILL': return {
            ...state, bills: { ...state.bills, data: [...state.bills.data, { ...action.payload }] }
        }
        case 'DELETE_BILL': return {
            ...state, bills: {
                ...state.bills, data: state.bills.data.filter((ele) => {
                    return ele._id != action.payload
                })
            }
        }


        default:
            return { ...state }
    }
}

export default rootReducer 