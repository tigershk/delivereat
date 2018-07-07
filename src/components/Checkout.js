import React from 'react';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      userCode: '',
      mobile: ''
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleCheckout = this.handleCheckout.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  // handlePayment() {
  //   console.log("All ur gold r minez!")
  // }

  //Checkout function that POSTs order back to server for restaurant manager to view at /orders

  handlePayment(event) {

    event.preventDefault();

    let custOrder = Object.assign({}, this.props.order, { ["mobile"]: this.state.mobile });

    fetch('/orders', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(custOrder)
    })
      .then(response => response.json()
      );

  }

  //Input handler for user entering voucher code
  handleChange(event) {
    event.preventDefault();
    event.target.name === "mobile" ?
      this.setState({ mobile: event.target.value }) :
      this.setState({ userCode: event.target.value });
  }

  render() {

    let discount_code = 'CL101';
    const delivery_fee = 2.50;
    return (
      <div className="popup">
        <div className='popup_inner'>
          <header className="main__menu--article-h3">
            Mobile number for notification: <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
            <br />
          </header>
          <div className="main__order--lines">
            {/* <header className="main__order--article-h3"> */}
            {Object.keys(this.props.order).map(orderItem => {
              for (let i = 0; i < this.props.menu.length; i++) {
                if (this.props.menu[i].name === orderItem) {
                  (this.props.menu[i].price * this.props.order[orderItem]);
                  return (
                    <li key={orderItem} className="order-line">

                      {this.props.order[orderItem]}  x
                      {orderItem}  {(this.props.menu[i].price * this.props.order[orderItem]).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
                    </li>
                  )
                }
              }
            })}
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

          <div className="popup__divider">
            <br />
            <button
              onClick={this.props.closePopup}
              className="popup__cancel"
            >Cancel
            </button>

            <button
              onClick={this.handlePayment}
              className="popup__add"
              name="Login"
            >Pay
            </button>
          </div>


        </div>
      </div>
    )
  }
}

export default Checkout;