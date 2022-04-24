import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import PrivateRoute from "./helpers/PrivateRoute"
import { Route } from 'react-router-dom'
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Customers from "./components/customers/CustomerContainer";
import Products from "./components/products/ProductsContainer";
import BillLists from "./components/bills/BillLists";
import BillDetail from "./components/bills/BillDetail";
import { useDispatch, useSelector } from "react-redux";

import { startGetCustomers } from './actions/customers';
import { startGetProducts } from './actions/products';
import { startGetUsers } from './actions/users'
import { asyncGetBills } from './actions/bills'


import './App.css';

function App() {

  const dispatch = useDispatch()

  const loggedIn = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(startGetCustomers())
      dispatch(startGetProducts())
      dispatch(startGetUsers())
      dispatch(asyncGetBills())
    }
  }, [loggedIn.userLoggedIn])



  return (
    <div className="container">
      <NavBar />

      <Route path="/" component={Home} exact={true} />
      <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
      <PrivateRoute path="/customers" component={Customers} />
      <PrivateRoute path="/products" component={Products} />
      <PrivateRoute path="/bills" component={BillLists} />
      <PrivateRoute path="/billdetails/:id" component={BillDetail} exact />
      <PrivateRoute path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
