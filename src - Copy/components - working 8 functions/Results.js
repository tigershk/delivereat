import React from "react";
import Result from "./Result";


class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {}, // concise object containing pizza id : quantity
      basketArray: [], // contains objects representing each bill line item 
      billTotal: 0, // contains total before delivery fee (delivery fee set in render)
      userCode: ''
    }

    this.receiveOrder = this.receiveOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.createBasketItem = this.createBasketItem.bind(this)
    this.handleChange = this.handleChange.bind(this)//deals with discount code entered
    this.storeHistory = this.storeHistory.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.deleteHistory = this.deleteHistory.bind(this)
  }

  //receives + and - items from results.js and calls function to create line items in bill
  receiveOrder(name, quantity) {
    const custOrder = (Object.assign({}, this.state.order, { [name]: quantity }))
    this.setState({ order: custOrder }, () => this.createBasketItem());
  }

  // creates a new basket Array populated with line items in bill containing menu name, quantity and subtotal 
  createBasketItem() {
    let basketCopy = [];
    let basketItem = {};
    let basketTotal = 0;

    // loop through keys in order and populate temporary basket item object with items to be inserted into basket Array
    Object.keys(this.state.order).forEach(orderKey => {
      for (let i = 0; i < this.props.menu.length; i++) {
        if (this.props.menu[i].name === orderKey) {
          basketItem = {
            key: orderKey, //pizza name is now the key
            quantity: this.state.order[orderKey],
            subTotal: (this.props.menu[i].price * this.state.order[orderKey])
          }
        }
      }

      //Basket line items added into state(basketArray) with subtotals at end
      basketCopy.push(basketItem)
      this.setState({ basketArray: basketCopy })

      //Basket total is sum of all subtotals
      basketTotal += basketItem["subTotal"]
      this.setState({ billTotal: basketTotal })
    })

  }
  //Stops page from refreshing every time a button on the form is pressed
  handleSubmit(event) {
    event.preventDefault();
  }

  //Checkout function that posts order back to server for restaurant manager to view at /orders, also stores in local history
  handleCheckout(event) {
    event.preventDefault();

    fetch('/menu', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.basketArray)
      // body: JSON.stringify(this.state.order)
    })
      .then(response => response.json()
      )
      .then(function (body) {
        console.log("body", body);
      });
    this.storeHistory();
  }

  storeHistory() {
    localStorage.setItem('history', JSON.stringify(this.state.order));
    console.log("stored in local history: ", JSON.stringify(this.state.order))
  }

  getHistory() {
    let history = JSON.parse(localStorage.getItem('history'))
    this.setState({ order: history })
    console.log("Your order history is: ", history)
  }

  deleteHistory() {
    localStorage.removeItem('history');
    console.log("Your order history was deleted")
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ userCode: event.target.value })
  }

  render() {

    let delivery_fee = 1.00;
    let discount_code = 'CL101';
    console.log(this.state.basketArray)
    return (
      <div className="menu">
        <form className="order__form"
          id="order__form"
          onSubmit={this.handleSubmit}>
          {this.props.menu.map(menuItem => {
            return (
              <Result
                key={menuItem.id}
                menuItem={menuItem}
                receiveOrder={this.receiveOrder}
              />
            );
          })}
        </form>

        <div className="bill">
          <h2>Your Basket </h2>
          <div className="bill__total">
            {this.state.basketArray.map(basketLine => {
              return (<div> {basketLine.quantity}x {basketLine.key} {basketLine.subTotal}</div>)
            })}
            <div className="bill_total--sum">
              <p>
                Subtotal: {(this.state.billTotal).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
                <br />
                Delivery fee: {(delivery_fee).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

                <br />
                Total: {((this.state.billTotal) + (delivery_fee)).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

                <br />
                Discount code:<input type="text" name="voucher" value={this.state.userCode} onChange={this.handleChange} />
              </p>
              {this.state.userCode === discount_code ? <p>10% discount applied<br />
                You saved:{(((this.state.billTotal) + (delivery_fee)) * .1).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}<br />
                Total to pay: {(((this.state.billTotal) + (delivery_fee)) * .9).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</p> : ''
              }

              <button
                type="submit" className="bill__checkout"
                onClick={this.handleCheckout}>
                Checkout
            </button>

            </div>
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
        </div>
      </div>
    )
  }
}

export default Results;