import React from "react";

// This component displays previous order history with delete and add buttons

class Orders extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    event.target.value === "delete" ? this.props.deleteHistory(this.props.orderNum) : this.props.overwriteOrder(this.props.orderNum)

  }

  render() {

    return (

      <div>
        <p>
          <button
            type="submit"
            onClick={this.handleChange}
            className="menu__item--confirm"
            value="add"
          >➕
          </button>
          <button className="menu__item--delete"
            type="submit"
            value="delete"
            onClick={this.handleChange}>
            ⛌
          </button>

          Order: {this.props.orderNum}</p>

        {Object.keys(this.props.prevOrder).map(lineItem => {
          return (

            <div className="order-line" id={lineItem}><p>
              {this.props.prevOrder[lineItem]} x  {lineItem}</p>
            </div>
          )
        })}

      </div>
    )
  }
}

export default Orders;