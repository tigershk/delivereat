import React from "react";
import Orders from "./Orders";

class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderHistory: {},
    }

    this.getHistory = this.getHistory.bind(this)
    this.deleteHistory = this.deleteHistory.bind(this)
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
          type="submit"
          onClick={this.getHistory}>
          Order History
        </button>

        <button
          type="submit"
          onClick={this.deleteHistory}>
          Delete History
        </button>

        {/* Copies array of keys, reverses and then loops through to get reverse chronological order */}
        {Object.keys(this.state.orderHistory).slice().reverse().map(prevKey => {
          let orderNum = prevKey;
          return (
            <div className="order-history">
              <Orders
                // key={prevKey}
                orderNum={orderNum}
                prevOrder={this.state.orderHistory[prevKey]}
                deleteHistory={this.deleteHistory}
                overwriteOrder={this.overwriteOrder}
              />
            </div>
          )
        }
        )}

      </div>
    )
  }
}

export default History;