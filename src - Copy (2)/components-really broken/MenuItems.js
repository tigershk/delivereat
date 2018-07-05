import React from "react";
import MenuItem from "./MenuItem";
import Bill from "./Bill";
import History from "./History";
import Checkout from "./Checkout";

// This component sets {order} in state from MenuItem and calculates line items to pass to Bill
class MenuItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {}, // concise object containing pizza id : quantity
      basketArray: [], // contains objects representing each bill line item 
      billTotal: 0, // contains total before delivery fee (delivery fee set in render)
      checkOut: false,
      pizzaQuantity: 0
    }

    this.receiveOrder = this.receiveOrder.bind(this)
    this.repeatOrder = this.repeatOrder.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createBasketItem = this.createBasketItem.bind(this)
  }

  //receives + and - items from MenuItems and calls function to create line items in bill
  receiveOrder(name, custAction) {

    if (custAction === "increase") {
      this.setState({ pizzaQuantity: this.state.pizzaQuantity + 1 }, () => { const custOrder = Object.assign({}, this.state.order, { [name]: this.state.pizzaQuantity }) })
    }
    else {
      this.setState({ pizzaQuantity: this.state.pizzaQuantity - 1 }, () => { const custOrder = Object.assign({}, this.state.order, { [name]: this.state.pizzaQuantity }) })
    }

    // const custOrder = (Object.assign({}, this.state.order, { [name]: this.state.pizzaQuantity }))
    this.setState({
      order: custOrder,
      checkOut: false
    }, () => this.createBasketItem());

  }

  // creates a new basketArray populated with line items in bill containing menu name, quantity and subtotal to display
  createBasketItem() {
    let basketCopy = [];
    let basketItem = {};
    let basketTotal = 0;
    console.log("this.state.order after assign", this.state.order)
    // loop through keys in order and populate temporary basket item object with items to be inserted into basket Array
    Object.keys(this.state.order).forEach(orderName => {
      for (let i = 0; i < this.props.menu.length; i++) {
        if (this.props.menu[i].name === orderName) {
          basketItem = {
            key: orderName, //pizza name is now the key
            quantity: this.state.order[orderName],
            subTotal: (this.props.menu[i].price * this.state.order[orderName])
          }
        }
      }
    }

    )

    //Basket line items added into state(basketArray) with subtotals at end
    basketCopy.push(basketItem)
    this.setState({ basketArray: basketCopy })

    //Basket total is sum of all subtotals
    basketTotal += basketItem["subTotal"]
    this.setState({ billTotal: basketTotal })
  }


  //receives previous order from History.js and repeats order
  repeatOrder(name, quantity) {

    const custOrder = { [name]: quantity };
    this.setState({ order: custOrder }, () => this.createBasketItem());
  }

  // Clears all orders and bill totals 
  clearOrder() {

    this.setState({
      basketArray: [],
      order: {},
      billTotal: 0,
      checkOut: true
    }
      // , () => (
      //   console.log("basket array ", this.state.basketArray, "order", this.state.order, "bill total", this.state.billTotal))
    )

  }

  //Stops page from refreshing every time a button on the form is pressed
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    return (
      <div className="menu">
        <form className="order__form"
          onSubmit={this.handleSubmit}>
          {this.props.menu.map(menuItem => {
            return (
              <MenuItem
                key={menuItem.id}
                menuItem={menuItem}
                receiveOrder={this.receiveOrder}

              />
            );
          })}
        </form>
        <div className="bill__checkout">
          <Bill basketArray={this.state.basketArray}
            billTotal={this.state.billTotal} />
          <Checkout clearOrder={this.clearOrder}
            order={this.state.order} />
        </div>
        <History
          repeatOrder={this.repeatOrder}
        />
      </div>

    )
  }
}

export default MenuItems;