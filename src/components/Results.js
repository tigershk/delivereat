import React from "react";
import Result from "./Result";

// let orderArray = [];
class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {},
      billTotal: []
    }

    this.receiveOrder = this.receiveOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createTotal = this.createTotal.bind(this)
    this.mapObject = this.mapObject.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  receiveOrder(id, quantity) {
    // console.log("receive order ", id, quantity)
    const custOrder = (Object.assign({}, this.state.order, { [id]: quantity }))
    this.setState({ order: custOrder }, () => this.createTotal());
    // console.log("after set state", this.state.order)
  }

  createTotal() {
    let bill = 0;
    // let billId = 101;
    Object.keys(this.state.order).forEach(orderKey => {
      for (let i = 0; i < this.props.menu.length; i++) {
        if (this.props.menu[i].id === parseInt(orderKey, 10)) {
          // this.setState({ order[orderKey]: this.props.menu[i].name });
          console.log("price", this.props.menu[i].price);

          console.log("order", this.props.menu[i].name);
          bill += this.state.order[orderKey] * this.props.menu[i].price;
          // console.log("billTotal ", billTotal)
        }
      }
      this.setState({ billTotal: bill })
      // console.log(this.state.billTotal)
    })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleCheckout(event) {
    event.preventDefault();
    console.log("User wants to Checkout", this.state.order)

    fetch('/orders', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.order)
      // body: JSON.stringify({ order: "100", body: "3" })
    })
      .then(response => response.json()
      )
      .then(function (body) {
        console.log("body", body);

      });

  }
  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {

      return callback(key, object[key]);
    });
  }
  render() {
    // console.log(this.state.order)
    return (
      <div className="menu">
        <form className="order__form"
          id="order__form"
          onSubmit={this.handleSubmit}>
          <div className="results__body">
            {this.props.menu.map(menuItem => {
              return (
                <Result
                  key={menuItem.id}
                  menuItem={menuItem}
                  receiveOrder={this.receiveOrder}
                />
              );
            })}
          </div>

        </form>
        <div className="bill">
          {/* {this.state.order[orderKey]} */}
          <h2>Your Basket </h2>

          {this.mapObject(this.state.order, function (key, value) {

            return <div>   Pizza Id: {key}, Quantity: {value}</div>;
          })}

          £{this.state.billTotal}
          <button
            type="submit"
            onClick={this.handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    )
  }
}

export default Results;