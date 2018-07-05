import React from "react";
import Bill from "./Bill";
import History from "./History";

class Order extends React.Component {

  constructor(props) {
    super(props);

    this.receiveRepeatOrder = this.receiveRepeatOrder.bind(this);
  }

  //Stops page from refreshing every time a button on the form is pressed
  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ userCode: event.target.value })
  }

  receiveRepeatOrder(repeatOrder) {
    this.props.repeatOrder(repeatOrder)

  }

  render() {
    let billTotal = 0;

    return (
      <div className="main__order">
        <img className="main__order--img" src="./static/unsplash-food.jpg" />

        <div className="main__order--lines">
          {Object.keys(this.props.order).map(orderItem => {
            for (let i = 0; i < this.props.menu.length; i++) {
              if (this.props.menu[i].name === orderItem) {
                billTotal += (this.props.menu[i].price * this.props.order[orderItem]);
                return (
                  <li key={orderItem} className="order-line">

                    {this.props.order[orderItem]}x {orderItem} {(this.props.menu[i].price * this.props.order[orderItem]).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
                  </li>
                )
              }
            }
          })}

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