import React from "react";

//Displays order history lines
function Orders({ orderNum, prevOrder }) {


  return (

    <div className="order-line">
      <h3> Order {orderNum}</h3>
      {Object.keys(prevOrder).map(lineItem => {
        return (
          <p>{prevOrder[lineItem]} x {lineItem}</p>)
      })}
    </div>
  )
}

export default Orders;