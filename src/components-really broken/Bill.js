import React from "react";

//This component displays basket line items and calculates totals within render and deals with any discounts
class Bill extends React.Component {
  constructor() {
    super();

    this.state = {
      userCode: ''
    }

    this.handleChange = this.handleChange.bind(this)//deals with discount code entered  }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ userCode: event.target.value })
  }

  render() {
    let delivery_fee = 1.00;
    let discount_code = 'CL101';

    return (
      <div className="bill">
        <div className="bill__header">
          <h2>Your Basket
          <button className="bill__delete"
              type="submit"
              value="delete"
            >
              ⛌
          </button>
          </h2>
        </div>
        <div className="bill__total">
          <ul><h2>
            {this.props.basketArray.map(basketLine => {
              while (basketLine.quantity !== 0) {
                return (<li className={basketLine.key} id={basketLine.key}> {basketLine.quantity} x {basketLine.key} £{basketLine.subTotal}</li>)
              }
            })}
          </h2></ul>
          <div className="bill_total--sum" >
            <p>
              Subtotal: {(this.props.billTotal).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
              <br />
              delivery fee: {(delivery_fee).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

              <br />
              Total: {((this.props.billTotal) + (delivery_fee)).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
              <br />
              discount code:<input type="text" name="voucher" value={this.state.userCode} onChange={this.handleChange} />
            </p>
            {this.state.userCode === discount_code
              ? <p>10% discount applied<br />
                You saved:{(((this.props.billTotal) + (delivery_fee)) * .1).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}<br />
                Total to pay: {(((this.props.billTotal) + (delivery_fee)) * .9).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</p>
              : ''}
          </div>
        </div>
      </div>
    )
  }
}
export default Bill;