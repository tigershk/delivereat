import React from "react";

// This component displays previous order history with delete and add buttons

function OrderHistory({ orderNum, prevOrder, deleteHistory, receiveRepeatOrder }) {


  function handleChange(event) {

    event.target.value === "delete" ?
      deleteHistory(orderNum) :
      receiveRepeatOrder(orderNum)
  }

  return (

    <div>

      <button
        type="submit"
        onClick={handleChange}
        className="main__order--amount"
        value="add"
      >➕
      </button>
      Order: {orderNum}
      <button className="main__order--amount"
        type="submit"
        value="delete"
        onClick={handleChange}>
        ⛌
        </button>



      {Object.keys(prevOrder).map(lineItem => {
        if (lineItem === "mobile") return;
        return (
          <li key={lineItem} className="order-line">

            {prevOrder[lineItem]}x {lineItem}

          </li>
        )
      })}

    </div>
  )
}
export default OrderHistory;