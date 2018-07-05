import React from "react";
import Bill from "./Bill";
import History from "./History";

class Order extends React.Component {

  constructor(props) {
    super(props);

    this.receiveRepeatOrder = this.receiveRepeatOrder.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
  }

  receiveRepeatOrder(repeatOrder) {
    this.props.repeatOrder(repeatOrder)

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

    return (
      <div className="main__order">
        <img className="main__order--img" src="./static/unsplash-food.jpg" />

        <div className="main__order--lines">
          {/* <header className="main__order--article-h3"> */}
          {Object.keys(this.props.order).map(orderItem => {
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
          })}
          {/* </header> */}

          <Bill billTotal={billTotal}
            order={this.props.order} />
        </div>
        <h2>Order history </h2>
        <History receiveRepeatOrder={this.receiveRepeatOrder} />

      </div >

    )
  }
}

export default Order;