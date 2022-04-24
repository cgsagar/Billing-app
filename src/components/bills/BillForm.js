import React, { useState } from "react";
import { useSelector } from "react-redux";

const BillForm = (props) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today.toISOString().substr(0, 10));
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { togglePopup, formSubmit } = props;

  //Read customers data from Store
  const customersData = useSelector((state) => {
    return state.user.customers.data;
  });

  //Read Products data from Store
  const productsData = useSelector((state) => {
    return state.user.products.data;
  });

  const customerOptions = customersData.map((customer) => {
    return { key: customer._id, value: customer.name };
  });

  const productOption = productsData.map((product) => {
    return { key: product._id, value: product.name };
  });

  const handleChange = (e) => {
    const attr = e.target.name;
    if (attr === "date") {
      setStartDate(e.target.value);
    } else if (attr === "customer") {
      setCustomer(e.target.value);
    } else if (attr === "product") {
      setProduct(e.target.value);
    }
  };

  const handleAddtoCart = (id) => {
    const Item = cartItems.find((cartItem) => {
      return cartItem.id === id;
    });

    if (Item) {
      incQuantity(id);
    } else {

      const product = productsData.find((product) => {
        return product._id === id;
      });

      const newCartItem = {
        id: id,
        name: product.name,
        quantity: quantity,
        price: product.price,
        subtotal: product.price * quantity,
      };
      setCartItems([newCartItem, ...cartItems]);
    }
  };

  //Increment Quantity
  const incQuantity = (id) => {
    const res = cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          subtotal: cartItem.subtotal + cartItem.price,
        };
      } else {
        return { ...cartItem };
      }
    });
    setCartItems(res);
  };

  //Decrement Quantity
  const decQuantity = (id) => {
    const res = cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          subtotal: cartItem.subtotal - cartItem.price,
        };
      } else {
        return { ...cartItem };
      }
    });
    setCartItems(res);
  };

  //remove CartItem
  const handleRemoveCartItem = (id) => {
    const result = cartItems.filter((cartItem) => {
      return cartItem.id !== id
    })
    setCartItems(result)
  }

  //form Submit 
  const handleSubmit = (e) => {
    e.preventDefault();

    const lineItems = cartItems.map((cartItem) => {
      return { product: cartItem.id, quantity: cartItem.quantity }
    })

    const formData = {
      date: startDate,
      customer: customer,
      lineItems: lineItems,
    };

    formSubmit(formData, togglePopup)
    //console.log('formData', formData)
  };

  return (
    <div className="popUpWrap">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add Products
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={togglePopup}
            ></button>
          </div>
          <div className="modal-body ">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={startDate}
                      name="date"
                      onChange={handleChange}
                    />
                  </div>
                  <select
                    className="form-select mb-3"
                    value={customer}
                    name="customer"
                    onChange={handleChange}
                  >
                    <option selected>select Customer</option>
                    {customerOptions.map((customer) => {
                      return (
                        <option value={customer.key} key={customer.key}>
                          {customer.value}
                        </option>
                      );
                    })}
                  </select>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <select
                        className="form-select "
                        value={product}
                        name="product"
                        onChange={handleChange}
                      >
                        <option selected>select Product</option>
                        {productOption.map((product) => {
                          return (
                            <option value={product.key} key={product.key}>
                              {product.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button
                      className="btn btn-primary mx-3 col-md-3"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddtoCart(product);
                      }}
                    >
                      Add{" "}
                    </button>
                  </div>
                  <button
                    className="btn btn-primary col-md-3"
                    type='submit'
                  >
                    Submit
                  </button>
                </form>
              </div>
              {cartItems.length > 0 && (
                <div className="col-md-6">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Remove</th>
                        <th scope="col">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((cartItem) => {
                        return (
                          <tr>
                            <th>{cartItem.name}</th>
                            <td><div className="d-flex align-items-center"> <button className="btn btn-dark " disabled={cartItem.quantity === 1} onClick={() => decQuantity(cartItem.id)}> - </button> <span className="px-2">{cartItem.quantity} </span> <button className="btn btn-dark " onClick={() => incQuantity(cartItem.id)}> + </button> </div></td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleRemoveCartItem(cartItem.id)}>
                                Remove
                              </button>
                            </td>
                            <td>{cartItem.subtotal}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillForm;
