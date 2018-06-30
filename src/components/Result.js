import React from "react";

class Result extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pizzaQuantity: 0
    }

    this.handleChange = this.handleChange.bind(this)

  }

  handleChange() {
    this.setState({ pizzaQuantity: this.state.pizzaQuantity + 1 }, () => this.props.receiveOrder(this.props.menuItem.id, this.state.pizzaQuantity));
  }

  render() {
    // console.log
    return (
      <div className="menu__item" >
        <img src={this.props.menuItem.img}
          className="menu__item--pic"
          width="auto"
          height="200" />
        <div className="menu__item--text">
          <h2>{this.props.menuItem.name}</h2>
          <div className="menu__item--price">
            {this.props.menuItem.price} <br />
            {/* <input
            onChange={handleChange}
            type="number"
            className="order__quantity"
            id="order__quantity"
            name={menuItem.id}
            min="1"
            max="100"
          /> */}

            <button
              type="submit"
              onClick={this.handleChange}
              className="menu__item--confirm"
              id="menu__item--confirm"
              value="increase"
            > +
          </button>

          </div>
        </div>
      </div>

    );
  }
}

export default Result;