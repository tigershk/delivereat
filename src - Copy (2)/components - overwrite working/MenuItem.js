import React from "react";
import Popup from "./Popup";

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.receiveOrder = this.receiveOrder.bind(this);
  }


  //receives order details and passes up to MenuItems
  receiveOrder(orderName, orderQuantity) {

    this.props.receiveOrder(orderName, orderQuantity)
  }

  //toggle order popup on and off
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    // Displays menu items on offer with photos 📸
    return (
      <div className="menu_article">
        <div className="menu__item" onClick={this.togglePopup}>
          <img src={this.props.menuItem.img}
            className="menu__item--pic"
            width="auto"
            height="200" />
          <div className="menu__item--text" >
            <h2>{this.props.menuItem.name}<br />
              {(this.props.menuItem.price).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
              <br />
            </h2>
          </div>
        </div >
        {this.state.showPopup ?
          <Popup name={this.props.menuItem.name}
            price={this.props.menuItem.price}
            start={1}
            closePopup={this.togglePopup}
            receiveOrder={this.receiveOrder} />
          : null
        }
      </div>
    )
  }
}

export default MenuItem;