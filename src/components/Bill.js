import React from 'react';
import Checkout from './Checkout';

class Bill extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  //toggle login popup on and off
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  //Input handler for user entering voucher code
  handleChange(event) {
    event.preventDefault();
    this.setState({ userCode: event.target.value })
  }

  render() {

    return (
      <div className="bill">
        <button
          type="submit" className="bill__checkout"
          onClick={this.togglePopup}>
          Checkout
        </button>
        {this.state.showPopup ?
          <Checkout
            closePopup={this.togglePopup}
            billTotal={this.props.billTotal}
            order={this.props.order}
            menu={this.props.menu}
          />
          : null
        }

        <div className="bill_total--sum">
          <p>
            Subtotal: {(this.props.billTotal).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
            <br />

          </p>
        </div>
      </div>

    )
  }

}
export default Bill;