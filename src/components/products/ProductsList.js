import React, { useState } from "react";

import { filterByType, sortByType } from '../../selectors/search'
import { useSelector } from "react-redux";
import ProductsItem from "./ProductsItem";

import Pagination from "../../helpers/Pagination"


const ProductsList = (props) => {

    const { togglePopup } = props

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPage] = useState(3);

    const productData = useSelector((state) => {
        return state.user.products.data
    })

    console.log('newdata', productData)

    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('')

    const handleChange = (e) => {
        const inputValue = e.target.value
        setSearch(inputValue)
    }

    const handleOrder = (e) => {
        const inputValue = e.target.value
        setOrder(inputValue)
        sortByType(productData, inputValue)
    }

    const filterData = filterByType(productData, search)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = productData.slice(indexOfFirstPost, indexOfLastPost);

    console.log('Product-search', currentPosts)

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
                            <option value="price-high-to-low">Price - High to Low</option>
                            <option value="price-low-to-high">Price - Low to High</option>
                        </select>

                    </form>
                </div>

                <div className="col-md-4 justify-content-end d-flex">
                    <button type="button" className="btn btn-success" onClick={togglePopup}>
                        Add Products
                    </button>
                </div>
            </div>

            <div>
                {
                    filterData.length == 0 ?
                        (
                            <>
                                <h2>No Products Found</h2>
                                <p>Add your product first</p>
                            </>
                        ) :
                        (
                            <>
                                <h2>List of Products - {filterData.length} of {productData.length}</h2>
                                {
                                    (search.length > 0 ? filterData : currentPosts).map((product) => {
                                        return <ProductsItem key={product._id} product={product
                                        } />
                                    })
                                }
                            </>

                        )
                }


                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={productData.length}
                    paginate={paginate}
                />
            </div>
        </>
    )
}

export default ProductsList