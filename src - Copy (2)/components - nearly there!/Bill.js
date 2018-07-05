import React from 'react';

class Bill extends React.Component {
  constructor() {
    super();

    this.state = {
      userCode: ''
    }
    this.handleChange = this.handleChange.bind(this)
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