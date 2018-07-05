import React from "react";

class MenuItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pizzaQuantity: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  // Click handler for adding and decreasing quantities of pizza
  handleChange(event) {
    if (event.target.value === "increase") {
      this.setState({ pizzaQuantity: this.state.pizzaQuantity + 1 }, () => this.props.receiveOrder(this.props.menuItem.name, this.state.pizzaQuantity));
    }
    else {
      if (this.state.pizzaQuantity > 0) {
        this.setState({ pizzaQuantity: this.state.pizzaQuantity - 1 }, () => this.props.receiveOrder(this.props.menuItem.name, this.state.pizzaQuantity));
      }

    }
  }

  render() {
    // Displays menu items on offer with photos
    return (
      <div className="menu__item" >
        <img src={this.props.menuItem.img}
          className="menu__item--pic"
        />
        <div className="menu__item--text">
          <h2>{this.props.menuItem.name}<br />
            {(this.props.menuItem.price).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

            <br />
            <button
              type="submit"
              onClick={this.handleChange}
              className="menu__item--delete"
              value="decrease"
            >▼
          </button>

            <button
              type="submit"
              onClick={this.handleChange}
              className="menu__item--confirm"
              value="increase"
            >▲
          </button>
          </h2>
        </div>
      </div >

    );
  }
}

export default MenuItem;