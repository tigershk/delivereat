import React from "react";
import Bill from "./Bill";

class Order extends React.Component {

  constructor(props) {
    super(props);

  }

  //Stops page from refreshing every time a button on the form is pressed
  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ userCode: event.target.value })
  }

  render() {
    let billTotal = 0;

    return (
      <div className="order">
        <h2>Your Basket </h2>
        <div className="bill__total">
          {Object.keys(this.props.order).map(orderItem => {
            for (let i = 0; i < this.props.menu.length; i++) {
              if (this.props.menu[i].name === orderItem) {
                billTotal += (this.props.menu[i].price * this.props.order[orderItem]);
                return (
                  <div> {orderItem} x {this.props.order[orderItem]} {this.props.menu[i].price * this.props.order[orderItem]}</div>)
              }
            }
          })}

          <Bill billTotal={billTotal} />
          {/* <History basketArray={this.state.basketArray}
              order={this.props.order} /> */}
          {/* // receiveOrder={this.receiveOrder} /> */}
        </div>

      </div>

    )
  }
}

export default Order;