import React from "react";
import MenuItem from "./MenuItem";
import History from "./History";

class MenuItems extends React.Component {

  constructor(props) {
    super(props);

    this.receiveOrder = this.receiveOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //receives order from MenuItem and passes up to App
  receiveOrder(orderName, orderQuantity) {

    this.props.createOrder(orderName, orderQuantity)
  }

  //Stops page from refreshing every time a button on the form is pressed
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    return (
      // <div className="menu">
      <form className="main__menu"
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
      // </div>
    )
  }
}

export default MenuItems;