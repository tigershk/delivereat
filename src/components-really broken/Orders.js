import React from "react";

// This component displays previous order history with delete and add buttons

function Orders({ orderNum, prevOrder, deleteHistory, overwriteOrder }) {

  console.log(prevOrder)
  function handleChange(event) {
    event.target.value === "delete" ? deleteHistory({ orderNum }) : overwriteOrder({ orderNum })
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
        console.log("lineitem ", lineItem)
        return (
          <div className="order-line">
            {prevOrder[lineItem]} x {lineItem}
          </div>
        )
      })}

    </div>
  )
}
export default Orders;