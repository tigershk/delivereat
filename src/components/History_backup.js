import React from "react";

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      orderHistory: {},
      orderNumber: 101
    }

    this.handleCheckout = this.handleCheckout.bind(this)
    this.storeHistory = this.storeHistory.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.deleteHistory = this.deleteHistory.bind(this)
  }

  //Checkout function that POSTs order back to server for restaurant manager to view at /orders, also stores in local history
  handleCheckout(event) {
    event.preventDefault();

    fetch('/orders', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.props.basketArray)
    })
      .then(response => response.json()
      )
      .then(function (body) {
      });
    this.storeHistory();
    // this.props.receiveOrder('delete', 'delete')

  }
  //store order in local history
  storeHistory() {
    this.setState({ orderNumber: this.state.orderNumber + 1 });
    localStorage.setItem(`Customer order ${this.state.orderNumber}`, JSON.stringify(this.props.order));
    // console.log("Stored in local history: ", JSON.stringify(this.props.order))
  }

  getHistory() {
    fetch('/orders')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(orderData => {
        Object.values(orderData).forEach(orderNum => {

          // console.log("orderNum ", orderNum);
          Object.values(orderNum).forEach(orderLine => {
            //   // console.log(order)
            console.log("single order ", (orderLine))
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  //   // console.log("Your order history is: ", this.state.orderHistory)
  // }
  // getHistory() {
  //   let orderNo;
  //   fetch('/orders')
  //     .then(response => response.ok ? response.json() : Promise.reject(response))
  //     .then(orderData => {
  //       console.log(JSON.stringify(orderData));
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })

  // console.log("Your order history is: ", this.state.orderHistory)
  // }

  deleteHistory() {
    fetch('/orders')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(orderData => {
        console.log(JSON.stringify(orderData));
      })
      .catch(err => {
        console.log(err)
      })
    console.log("Your order history was deleted")
  }

  // getHistory() {
  // console.log("get history ordernumber ", this.state.orderNumber)
  // let history = JSON.parse(localStorage.getItem(`Customer order ${this.state.orderNumber}`));
  // this.setState({ order: history })
  // console.log("Your order history is: ", history)
  // }

  deleteHistory() {
    localStorage.removeItem(`Customer order ${this.state.orderNumber}`);
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
      </div>

    )
  }
}

export default History;