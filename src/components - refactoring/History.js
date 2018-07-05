import React from "react";
import Orders from "./Orders";

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      orderHistory: {},
      // orderNumber: 0
    }

    this.handleCheckout = this.handleCheckout.bind(this)
    // this.storeHistory = this.storeHistory.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.deleteHistory = this.deleteHistory.bind(this)
  }

  //Checkout function that POSTs order back to server for restaurant manager to view at /orders, also stores in local history
  handleCheckout(event) {
    event.preventDefault();

    fetch('/orders', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.props.order)
    })
      .then(response => response.json()
      )
      .then(function (body) {
      });
    // this.storeHistory();
    // this.props.receiveOrder('delete', 'delete')

  }


  getHistory() {
    fetch('/orders')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(orderData => {
        this.setState({ orderHistory: orderData });
        // console.log("state history", this.state.orderHistory)
        // console.log("keys", Object.keys(this.state.orderHistory))
        // console.log("values", Object.values(this.state.orderHistory))
      }
      )
      .catch(err => {
        console.log(err)
      })
  }

  deleteHistory() {
    fetch('/delete', {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: orderNum })
    })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(orderData => {
        console.log(JSON.stringify({ key: orderNum }));
      })
      .catch(err => {
        console.log(err)
      })
    console.log("Your order history was deleted")
  }

  render() {
    return (

      <div className="bill__orders" >

        <button
          type="submit" className="bill__checkout"
          onClick={this.handleCheckout}>
          Checkout
        </button>

        <button
          type="submit"
          onClick={this.getHistory}>
          Order History
        </button>

        <button
          type="submit"
          onClick={this.deleteHistory}>
          Delete History
        </button>
        <div className="order-history">
          {Object.keys(this.state.orderHistory).map(prevKey => {
            console.log("prevOrder key", prevKey);
            console.log("prev Order values", this.state.orderHistory[prevKey]);
            let orderNum = prevKey;
            return (
              <Orders
                key={prevKey}
                orderNum={orderNum}
                prevOrder={this.state.orderHistory[prevKey]}
                orderHistory={this.state.orderHistory}
              />
            )
          }
          )}
        </div>

      </div>

    )
  }
}

export default History;