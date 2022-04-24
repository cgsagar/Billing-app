import React from "react";

import { getProductinfoById } from "../../selectors/getInfoById";

const PrintBill = (props) => {
  const { userInfo, productInfo, customerInfo, billInfo } = props
  const getTotal = () => {
    const result = billInfo.lineItems.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.subTotal
    }, 0)
    return result
  }
  console.log('billInfo', billInfo)

  return (
    <div id="bill-info">
      <div className="card-body" style={{ textAlign: 'center' }}>
        <h5 className="card-title">{userInfo.businessName}</h5>
        <h6>{userInfo.address}</h6>
        <h6>Email: {userInfo.email}</h6>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <div style={{ padding: '0px 10px' }}>
          <p>Customer name: {customerInfo.name}</p>
          <p>Mobile: {customerInfo.mobile}</p>
        </div>
        <div style={{ padding: '0px 10px' }}>
          <p>Date: {billInfo.date.slice(0, 10)}</p>
        </div>
      </div>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl.No.</th>
            <th>Particulars</th>
            <th>MRP</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {

            billInfo.lineItems.map((lineItem, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{getProductinfoById(lineItem.product, productInfo).name}</td>
                  <td>{lineItem.price}</td>
                  <td>{lineItem.quantity}</td>
                  <td>{lineItem.subTotal}</td>
                </tr>
              )
            })
          }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th>Total</th>
            <th>{getTotal()}</th>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default PrintBill