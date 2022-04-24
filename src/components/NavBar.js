import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../actions/users"

const NavBar = (props) => {

    const loggedIn = useSelector((state) => {
        return state.user
    })
    console.log('user logging in', loggedIn)

    const dispatch = useDispatch()

    return (
        <div>
            <ul className="navclass list-unstyled">

                {
                    loggedIn.userLoggedIn ? (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/customers">Customers</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/bills">Bills</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/" onClick={() => {
                                dispatch(userLogout())

                            }}>Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/">Home</Link></li>
                        </>
                    )
                }
            </ul>
        </div>
    )
}

export default NavBar