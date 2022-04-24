import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BillItem from "./BillItem";
import AddBill from "./AddBill";
import { getCustomerinfoById } from '../../selectors/getInfoById'
import { getBillSearch } from '../../selectors/search'

import Pagination from "../../helpers/Pagination";
import { sortByType } from "../../selectors/search";
const Bills = (props) => {
  const [showPopup, setShowPopup] = useState(false)
  const [searchBox, setSearchBox] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsperPage, setPostsPerPage] = useState(4)
  const [orderBy, setOrderBy] = useState('')

  const dispatch = useDispatch();
  const billsData = useSelector((state) => {
    return state.user.bills.data;
  });

  const customersData = useSelector((state) => {
    return state.user.customers.data;
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleSearch = (e) => {
    setSearchBox(e.target.value)
  }
  const filteredData = getBillSearch(customersData, billsData, searchBox)

  //Get CurrentPosts
  const indexofLastpost = currentPage * postsperPage
  const indexofFirstPost = indexofLastpost - postsperPage
  const currentPosts = filteredData.slice(indexofFirstPost, indexofLastpost)

  const handleOrderChange = (e) => {
    const slectedVal = e.target.value
    //alert(slectedVal)
    //console.log('saas', billsData)
    setOrderBy(slectedVal)
    sortByType(customersData, slectedVal)
  }
  return (
    <>


      <div className="row mb-5 mt-5">

        <div className="col-md-4">
          <input className="form-control" type="text" placeholder="Search by name..." value={searchBox} onChange={handleSearch} />
        </div>

        <div className="col-md-4">
          <form>
            <select className="form-select" onChange={handleOrderChange}>
              <option selected="">Order Bills By</option>
              <option value="a-z">Name - Ascending</option>
              <option value="z-a">Name - Descending</option>

            </select>

          </form>
        </div>

        <div className="col-md-4 justify-content-end d-flex">
          <button type="button" className="btn btn-success" onClick={togglePopup}>
            Add Bill
          </button>

          {showPopup && <AddBill togglePopup={togglePopup} {...props} />}

        </div>
      </div>

      {
        filteredData.length > 0 ? (

          <>
            <h2 className="pb-2">List of Bills - {filteredData.length} of {billsData.length} </h2>
            {
              (searchBox.length > 0 ? filteredData : currentPosts).map((bill) => {
                return <BillItem key={bill._id} billInfo={bill} customerInfo={getCustomerinfoById(bill.customer, customersData)} id={bill._id} />;
              })
            }

          </>
        ) : (
          <>
            <h2>No Bills Found</h2>
            <p>Add the Bill</p>
          </>
        )}
      {filteredData.length > 0 && <Pagination postsPerPage={postsperPage} totalPosts={filteredData.length} paginate={paginate} />}
    </>
  );
};
export default Bills;
