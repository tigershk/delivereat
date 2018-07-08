import React from "react";
import Bill from "./Bill";
import History from "./History";
import CheckoutPopup from './CheckoutPopup';

class Order extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
  }

  //toggle login popup on and off
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }


  handleDecrease(event) {
    event.preventDefault();

    let amendedQuantity = parseInt(event.target.value, 10) - 1; //quantity
    let amendedName = event.target.name;// name

    this.props.amendOrder(amendedName, amendedQuantity)

  }

  handleIncrease(event) {
    event.preventDefault();

    let amendedQuantity = parseInt(event.target.value, 10) + 1; //quantity
    let amendedName = event.target.name;  // name
    this.props.amendOrder(amendedName, amendedQuantity);
  }

  render() {
    let billTotal = 0;
    const line =
      Object.keys(this.props.order).map(orderItem => {
        for (let i = 0; i < this.props.menu.length; i++) {
          if (this.props.menu[i].name === orderItem) {
            billTotal += (this.props.menu[i].price * this.props.order[orderItem]);
            return (
              <li key={orderItem} className="order-line">
                <button
                  onClick={this.handleDecrease}
                  className="main__order--amount"
                  value={this.props.order[orderItem]}
                  name={orderItem}
                >➖
              </button>

                {this.props.order[orderItem]}

                <button
                  onClick={this.handleIncrease}
                  className="main__order--amount"
                  value={this.props.order[orderItem]}
                  name={orderItem}
                >➕
              </button>
                {orderItem} {(this.props.menu[i].price * this.props.order[orderItem]).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
              </li>
            )
          }
        }
      })

    return (
      <div className="main__order">
        <img className="main__order--img" src="./static/unsplash-food.jpg" />

        <button
          type="submit" className="bill__checkout"
          onClick={this.togglePopup}>
          Checkout
        </button>

        {this.state.showPopup ?
          <CheckoutPopup
            closePopup={this.togglePopup}
            billTotal={billTotal}
            order={this.props.order}
            menu={this.props.menu}
            deleteOrder={this.props.deleteOrder}
          />
          : null
        }

        <div className="main__order--lines">

          {line}

          <Bill billTotal={billTotal}
            order={this.props.order}
            menu={this.props.menu} />
        </div>

        <History receiveRepeatOrder={this.props.receiveRepeatOrder} />

      </div >

    )
  }
}

export default Order;