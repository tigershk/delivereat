import React from "react";


function Orders({ orderNum, prevOrder }) {


  return (
    <div className="order-line">

      {Object.keys(prevOrder).map(lineItem => {
        return (<h3> Order {orderNum}    {prevOrder[lineItem]} x  {lineItem}

        </h3>)
      })}

    </div>

  )

}

export default Orders;