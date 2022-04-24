import React from "react";
import { useSelector } from 'react-redux'
import Chart from "./Charts";

const Dashboard = (props) => {

    const customerLength = useSelector((state) => {
        return state.user.customers.data
    })

    console.log('mapped data', customerLength)

    const productsLength = useSelector((state) => {
        return state.user.products.data
    })
    const billsLength = useSelector((state) => {
        return state.user.bills.data
    })

    // const orderTotal = () => {
    //     // let sum = 0
    //     // billsLength.forEach((ele) => {
    //     //     sum += ele.total
    //     // })
    //     // return sum       
    // }

    const result = billsLength.reduce(function (previousVal, currentVal) {
        return previousVal + currentVal.total
    }, 0)

    //console.log('total bills', orderTotal())

    const StatsItem = (props) => {

        const { count, text } = props
        return (
            <div className="col-md-3">

                <div className="card bg-grey">
                    <div className="card-header"><h1>{count}</h1></div>
                    <div className="card-body">
                        <div className="card-title">
                            <h3>{text}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>

            <div style={{ display: "flex", justifyContent: "center" }} className="mb-5">
                <h2 style={{ alignItems: "center" }}>Current Statistics </h2>
                <Chart />
            </div>

            {/* Stats of the Bills */}
            <div className="row mb-5">
                <StatsItem count={billsLength.length} text="Total Bills" />
                <StatsItem count={productsLength.length} text="Total Products" />
                <StatsItem count={customerLength.length} text="Total Customers" />
                <StatsItem count={result} text="Total Income" />
            </div>


            {/* Display recent products and customers */}
            <div class="row mt-5 mb-5">
                <div class="col-sm-5">
                    <div class="card border-info">
                        <div class="card-body">
                            <h4 class="card-title">Recent Customers</h4>
                            <ol>
                                {
                                    customerLength.slice(-5).reverse().map((ele) => {
                                        return <li key={ele._id}>{ele.name}</li>
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    &nbsp;
                </div>
                <div class="col-sm-5">
                    <div class="card border-info">
                        <div class="card-body">
                            <h4 class="card-title">Recent Products</h4>
                            <ol>
                                {
                                    productsLength.slice(-5).reverse().map((ele) => {
                                        return <li key={ele._id}>{ele.name}</li>
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>



        </>

    )
}

export default Dashboard