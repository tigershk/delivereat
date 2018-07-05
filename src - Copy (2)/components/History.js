import React from "react";
import OrderHistory from "./OrderHistory";

//This component retrieves the user's order history from the server and allows
// them to repeat the order or delete their order history

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      orderHistory: {},
    }

    this.getHistory = this.getHistory.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
    this.receiveRepeatOrder = this.receiveRepeatOrder.bind(this);
  }

  //Retrieve order from server and set in orderHistory state
  getHistory() {
    fetch('/orders')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(orderData => {
        this.setState({ orderHistory: orderData });
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Repeats order
  receiveRepeatOrder(orderToAdd) {
    this.props.receiveRepeatOrder(this.state.orderHistory[orderToAdd])
  }

  //Delete previous order number on server - not working
  deleteHistory(orderToDelete) {
    fetch(`/delete/${orderToDelete}`, {
      method: 'DELETE',
    })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(response => {
        console.log('Deleted:', res.message);
        return response
      })
      .catch(err => {
        console.log(err)
      })

    //Delete order from orderHistory in state
    const custOrder = (Object.assign({}, this.state.orderHistory));
    delete custOrder[orderToDelete];
    this.setState({ orderHistory: custOrder });
  }

  render() {
    return (

      <div className="bill__orders" >

        <button
          type="submit"
          onClick={this.getHistory}>
          Previous Orders
        </button>

        {/* Copies array of keys, reverses and then loops through to get reverse chronological order */}
        {Object.keys(this.state.orderHistory).slice().reverse().map(prevKey => {
          let orderNum = prevKey;

          return (
            <div className="order-history" key={orderNum}>
              <OrderHistory
                orderNum={orderNum}
                prevOrder={this.state.orderHistory[prevKey]}
                deleteHistory={this.deleteHistory}
                receiveRepeatOrder={this.receiveRepeatOrder}
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