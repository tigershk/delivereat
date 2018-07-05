import React from "react";

class Bill extends React.Component {
  constructor() {
    super();
  }

  render() {
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
              : ''}
          </div>
        </div>
      </div>
    )
  }
}
export default Bill;