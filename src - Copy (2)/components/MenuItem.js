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
      <div className="main__menu--article"  >
        <div className="menu__item" onClick={this.togglePopup}>
          <header className="main__menu--article-h2" >{this.props.menuItem.name}<br />
          </header>
          <header className="main__menu--article-h3">
            {this.props.menuItem.description}<br />
            {(this.props.menuItem.price).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
            <br />
          </header>

        </div >

        {this.state.showPopup ?
          <Popup name={this.props.menuItem.name}
            price={this.props.menuItem.price}
            minQuantity={1}
            closePopup={this.togglePopup}
            receiveOrder={this.receiveOrder} />
          : null
        }
      </div>
    )
  }
}

export default MenuItem;