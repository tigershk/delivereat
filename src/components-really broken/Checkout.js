import React from "react";

function Checkout({ clearOrder, order }) {

  //Checkout function that POSTs order back to server for restaurant manager to view at /orders

  function handleCheckout(event) {
    event.preventDefault();

    fetch('/orders', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order })
    })
      .then(response => response.json()
      )
      .then(function (body) {

      });

    // delete current order lines
    // Thank customer for order - available under order
    clearOrder();
  }

  return (

    <button
      type="submit" className="bill__checkout"
      onClick={handleCheckout}>
      Checkout
    </button>
  )
}

export default Checkout;