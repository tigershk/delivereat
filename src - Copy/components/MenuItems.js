import React from "react";
import MenuItem from "./MenuItem";
import History from "./History";

class MenuItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {}, // concise object containing pizza id : quantity
      basketArray: [], // contains objects representing each bill line item 
      billTotal: 0, // contains total before delivery fee (delivery fee set in render)
      userCode: ''
    }

    this.receiveOrder = this.receiveOrder.bind(this)
    this.repeatOrder = this.repeatOrder.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createBasketItem = this.createBasketItem.bind(this)
    this.handleChange = this.handleChange.bind(this)//deals with discount code entered  }
  }

  //receives + and - items from results.js and calls function to create line items in bill
  receiveOrder(name, quantity) {

    const custOrder = (Object.assign({}, this.state.order, { [name]: quantity }))
    this.setState({ order: custOrder }, () => this.createBasketItem());
  }

  //receives previous order from History.js and repeats order
  repeatOrder(name, quantity) {

    const custOrder = { [name]: quantity };
    this.setState({ order: custOrder }, () => this.createBasketItem());
  }

  clearOrder() {
    this.setState({
      basketArray: [],
      billTotal: 0
    })

  }

  // creates a new basketArray populated with line items in bill containing menu name, quantity and subtotal to display
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

  handleChange(event) {
    event.preventDefault();
    this.setState({ userCode: event.target.value })
  }

  render() {
    // console.log("Basket Array in Results render is ", this.state.basketArray)
    let delivery_fee = 1.00;
    let discount_code = 'CL101';

    return (
      <div className="menu">
        <form className="order__form"
          onSubmit={this.handleSubmit}>
          {this.props.menu.map(menuItem => {
            return (
              <MenuItem
                key={menuItem.id}
                menuItem={menuItem}
                receiveOrder={this.receiveOrder}
              />
            );
          })}
        </form>

        <div className="bill">
          <div className="bill__header">
            <h2>Your Basket
            <button className="bill__delete"
                type="submit"
                value="delete"
              // onClick={this.handleChange}>
              >
                ⛌
            </button>
            </h2>
          </div>
          <div className="bill__total">
            <ul><h2>
              {this.state.basketArray.map(basketLine => {
                while (basketLine.quantity !== 0) {
                  return (<li className={basketLine.key} id={basketLine.key}> {basketLine.quantity} x {basketLine.key} £{basketLine.subTotal}</li>)
                }
              })}
            </h2></ul>
            <div className="bill_total--sum" >
              <p>
                Subtotal: {(this.state.billTotal).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
                <br />
                Delivery fee: {(delivery_fee).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

                <br />
                Total: {((this.state.billTotal) + (delivery_fee)).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

                <br />
                Discount code:<input type="text" name="voucher" value={this.state.userCode} onChange={this.handleChange} />
              </p>
              {this.state.userCode === discount_code
                ? <p>10% discount applied<br />
                  You saved:{(((this.state.billTotal) + (delivery_fee)) * .1).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}<br />
                  Total to pay: {(((this.state.billTotal) + (delivery_fee)) * .9).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</p>
                : ''
              }

              <History
                order={this.state.order}
                repeatOrder={this.repeatOrder}
                clearOrder={this.clearOrder} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default MenuItems;