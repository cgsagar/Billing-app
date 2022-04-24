import React from "react";

const Home = (props) => {
    return (
        <div>
            <h1>Welcome to Billing App</h1>

            <>

                <div className="row mt-5">
                    <div className="col-sm-6">
                        <div className="card border-success">
                            <div className="card-body">
                                <h5 className="card-title">User</h5>
                                <p className="card-text">User can register using your own credentials or for testing purpose one can use the below provided login credentials to login.</p>
                                <p><b>Email</b>: admin12@gmail.com&nbsp;&nbsp;&nbsp;<b>Password</b>: admin123</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card border-success">
                            <div className="card-body">
                                <h5 className="card-title">Customers</h5>
                                <p className="card-text">Once logged in user can add customer, edit customer or remove customer details in the specific page</p>
                                <p>Also searching and sorting functionality is provided based on the name</p>
                            </div>
                        </div>
                    </div>
                </div>

            </>

            <>

                <div className="row mt-5">
                    <div className="col-sm-6">
                        <div className="card border-success">
                            <div className="card-body">
                                <h5 className="card-title">Products</h5>
                                <p className="card-text">Once logged in user can add product, edit product or remove product details in the specific page</p>
                                <p>Also searching and sorting functionality is provided based on the name and price</p><br />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card border-success">
                            <div className="card-body">
                                <h5 className="card-title">Bills</h5>
                                <p className="card-text">After adding products and customers, user can add the bill for particular customer with the products needed</p>
                                <p>Based on details of the bills, in the dashboard the Chart is shown once logged in. Also searching and sorting functionality is provided based on the name and price. </p>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        </div>


    )
}

export default Home