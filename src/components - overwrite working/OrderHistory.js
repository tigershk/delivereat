import React from "react";

// This component displays previous order history with delete and add buttons

function OrderHistory({ orderNum, prevOrder, deleteHistory, receiveRepeatOrder }) {


  function handleChange(event) {
    console.log("order num in orderhistory", orderNum)
    event.target.value === "delete" ? deleteHistory(orderNum) : receiveRepeatOrder(orderNum)
  }

  return (

    <div>
      <button
        type="submit"
        onClick={handleChange}
        className="menu__item--confirm"
        value="add"
      >➕
      </button>

      <button className="menu__item--delete"
        type="submit"
        value="delete"
        onClick={handleChange}>
        ⛌
        </button>

      Order: {orderNum}

      {Object.keys(prevOrder).map(lineItem => {
        return (
          <li key={lineItem} className="order-line">

            {prevOrder[lineItem]} x {lineItem}

          </li>
        )
      })}

    </div>
  )
}
export default OrderHistory;