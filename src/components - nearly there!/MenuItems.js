import React from "react";
import MenuItem from "./MenuItem";
import History from "./History";

class MenuItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      basketArray: [], // contains objects representing each bill line item 

    }

    this.receiveOrder = this.receiveOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)//deals with discount code entered  }
  }

  //receives + and - items from results.js and calls function to create line items in bill
  receiveOrder(orderName, orderQuantity) {

    this.props.createOrder(orderName, orderQuantity)
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
      </div>
    )
  }
}

export default MenuItems;