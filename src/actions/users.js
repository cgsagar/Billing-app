import axios from "../config/axios";
import Swal from 'sweetalert2';


export const postUsers = (adduser, redirect) => {
    return (dispatch) => {
        axios.post('/users/register', adduser)
            .then((res) => {
                const newdata = res.data
                if (newdata.hasOwnProperty('errmsg')) {
                    Swal.fire('Error message', newdata.errmsg)
                    //dispatch(errHandle(newdata.errmsg))
                } else {
                    dispatch(addUsers(newdata))
                    redirect()
                }
                //console.log(user)

            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const addUsers = (newuser) => {
    return {
        type: 'ADD_USER',
        payload: newuser
    }
}


// Get all the users list using GET request
export const startGetUsers = () => {
    return (dispatch) => {
        axios.get('/users/account', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const userData = res.data
                console.log(userData)
                dispatch(setUsers(userData))
                //dispatch(toggleLoading())
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
const setUsers = (userDetails) => {
    return {
        type: 'SET_USER',
        payload: userDetails
    }
}


//Login 

export const postLogin = (loginData, redirect) => {
    return (dispatch) => {
        axios.post('/users/login', loginData)
            .then((res) => {
                const user = res.data
                if (user.hasOwnProperty('errors')) {
                    //dispatch(errHandle(user.errors))
                    //redirect('/login')
                    Swal.fire(user.errors)
                    //props.history.push('/login')
                } else {
                    localStorage.setItem('token', user.token)
                    Swal.fire("successfully logged in")
                    dispatch(newLoginData())
                    redirect('/dashboard')
                }
                //console.log(user)

            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const errHandle = (err) => {
    return {
        type: 'ERR_HANDLE',
        payload: err
    }
}

const newLoginData = () => {
    return {
        type: 'LOGIN_USER'
    }
}





// Set Logout
export const userLogout = () => {
    localStorage.removeItem('token')
    return {
        type: 'LOGGED_OUT'
    }
}
