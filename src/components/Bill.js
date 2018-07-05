import React from 'react';

class Bill extends React.Component {
  constructor() {
    super();
    this.state = {
      userCode: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  //Checkout function that POSTs order back to server for restaurant manager to view at /orders

  // Need to work out how to clear order on checkout - maybe do a popup or navigate to new area. conditional rendering?

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

  //Input handler for user entering voucher code
  handleChange(event) {
    event.preventDefault();
    this.setState({ userCode: event.target.value })
  }

  render() {

    let delivery_fee = 2.50;
    let discount_code = 'CL101';

    return (
      <div className="bill">
        <button
          type="submit" className="bill__checkout"
          onClick={this.handleCheckout}>
          Go to Checkout
        </button>

        <div className="bill_total--sum">
          <p>
            Subtotal: {(this.props.billTotal).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
            <br />
            Delivery fee: {(delivery_fee).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

            <br />
            Total: {((this.props.billTotal) + (delivery_fee)).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

            <br />
            <input type="text" name="voucher" placeholder="Discount Code" value={this.state.userCode} onChange={this.handleChange} />
          </p>
          {this.state.userCode === discount_code
            ? <p>10% discount applied<br />
              You saved:{(((this.props.billTotal) + (delivery_fee)) * .1).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}<br />
              Total to pay: {(((this.props.billTotal) + (delivery_fee)) * .9).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</p>
            : ''
          }
        </div>
      </div>

    )
  }
}

export default Bill;