import React from "react";
import Result from "./Result";


class Results extends React.Component {

  constructor(props) {
    super(props);
    // this.state={

    // }
    this.receiveOrder = this.receiveOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //receives + and - items from results.js and passes orders back up to app to set state
  receiveOrder(name, quantity) {
    const custOrder = (Object.assign({}, this.props.order, { [name]: quantity }));
    this.props.receiver(custOrder)

  }

  //Stops page from refreshing every time a button on the form is pressed
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {

    return (

      <form className="order__form"
        id="order__form"
        onSubmit={this.handleSubmit}>
        {this.props.menu.map(menuItem => {
          return (
            <Result
              key={menuItem.id}
              menuItem={menuItem}
              receiveOrder={this.receiveOrder}
            />
          );
        })}
      </form>

    )
  }
}

export default Results;