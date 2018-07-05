import React from 'react';

class Popup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      orderQuantity: this.props.minQuantity //default of 1
    }

    this.addOrder = this.addOrder.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
  }

  handleDecrease(event) {
    event.preventDefault();
    this.state.orderQuantity > 1 ?
      this.setState({ orderQuantity: this.state.orderQuantity - 1 }) :
      null;

  }

  handleIncrease(event) {
    event.preventDefault();
    this.setState({ orderQuantity: this.state.orderQuantity + 1 })
  }

  // Click handler for adding amount to order and closing popup
  addOrder(event) {
    event.preventDefault();

    event.target.name === "add" ?
      this.props.receiveOrder(this.props.name, this.state.orderQuantity) :
      null;

    this.props.closePopup();

  }

  render() {
    // subtotal calculation to display on Add button
    const popupTotal = (this.state.orderQuantity * this.props.price).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' });

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2>{this.props.name}</h2>
          <br />
          <br />

          <button
            onClick={this.handleDecrease}
            className="menu__item--confirm"
            id="menu__item--confirm"
            value="decrease"
          >➖
          </button>

          {this.state.orderQuantity}

          <button
            onClick={this.handleIncrease}
            className="menu__item--confirm"
            id="menu__item--confirm"
            value="increase"
          >➕
          </button>

          <br />
          <button onClick={this.props.closePopup}>Cancel</button>
          <button onClick={this.addOrder}
            name="add"
          >Add for {popupTotal}
          </button>
        </div>
      </div>

    );
  }
}

export default Popup;