import React from "react";

class Order extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      basketArray: [], // contains objects representing each bill line item
      billTotal: 0,
      userCode: ''
    }

    this.createBasketItem = this.createBasketItem(this);
  }

  createBasketItem() {
    let basketCopy = [];
    let basketItem = {};
    let basketTotal = 0;

    // loop through keys in order and populate temporary basket item object with items to be inserted into basket Array
    Object.keys(this.props.order).forEach(orderKey => {
      for (let i = 0; i < this.props.menu.length; i++) {
        if (this.props.menu[i].name === orderKey) {
          basketItem = {
            key: orderKey, //pizza name is now the key
            quantity: this.props.order[orderKey],
            subTotal: (this.props.menu[i].price * this.props.order[orderKey])
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
      <div className="bill">
        <h2>Your Basket </h2>
        <div className="bill__total">
          {this.state.basketArray.map(basketLine => {
            while (basketLine.quantity !== 0) {
              return (<div> {basketLine.quantity}x {basketLine.key} {basketLine.subTotal}</div>)
            }
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
            {this.state.userCode === discount_code
              ? <p>10% discount applied<br />
                You saved:{(((this.state.billTotal) + (delivery_fee)) * .1).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}<br />
                Total to pay: {(((this.state.billTotal) + (delivery_fee)) * .9).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</p>
              : ''
            }

            {/* <History basketArray={this.state.basketArray}
              order={this.props.order} /> */}
            {/* // receiveOrder={this.receiveOrder} /> */}
          </div>

        </div>
      </div>

    )
  }
}

export default Order;