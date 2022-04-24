import React, { useState } from "react";

import { filterByType, sortByType } from '../../selectors/search'
import { useSelector } from "react-redux";
import CustomerItem from "./CustomerItem";

import Pagination from "../../helpers/Pagination"

const CustomerList = (props) => {

    const { togglePopup } = props


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPage] = useState(3);

    const customerData = useSelector((state) => {
        return state.user.customers.data
    })

    //console.log('newdata', customerData)

    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('')

    const handleChange = (e) => {
        const inputValue = e.target.value
        setSearch(inputValue)
    }

    const filterData = filterByType(customerData, search)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filterData.slice(indexOfFirstPost, indexOfLastPost);


    const handleOrder = (e) => {
        const inputValue = e.target.value
        setOrder(inputValue)
        sortByType(customerData, inputValue)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (

        <>
            <div className="row mb-5 mt-5">

                <div className="col-md-4">
                    <input className="form-control" type="text" placeholder="Search by name..." value={search} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <form>
                        <select value={order} className="form-select" onChange={handleOrder}>
                            <option value="">Order by</option>
                            <option value="a-z">Name - Ascending</option>
                            <option value="z-a">Name - Descending</option>

                        </select>

                    </form>
                </div>

                <div className="col-md-4 justify-content-end d-flex">
                    <button type="button" className="btn btn-success" onClick={togglePopup}>
                        Add Customer
                    </button>
                </div>
            </div>

            <div>
                {
                    filterData.length == 0 ?
                        (
                            <>
                                <h2>No Customers Found</h2>
                                <p>Add your customer first</p>
                            </>
                        ) :
                        (
                            <>
                                <h2 className="pb-2">List of Customers - {filterData.length} of {customerData.length} </h2>
                                {
                                    (search.length > 0 ? filterData : currentPosts).map((customer) => {
                                        return <CustomerItem key={customer._id} customer={customer} />
                                    })
                                }
                            </>

                        )
                }

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={customerData.length}
                    paginate={paginate}
                />
            </div>
        </>
    )
}

export default CustomerList