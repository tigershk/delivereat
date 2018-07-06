import React from "react";

class Admin extends React.Component {

  constructor() {
    super();

    // this.state = {
    //   orderHistory: {},
    // }
    // this.getHistory = this.getHistory.bind(this);
  }

  // //Retrieve order from server and set in orderHistory state
  // getHistory() {
  //   fetch('/orders')
  //     .then(response => response.ok ? response.json() : Promise.reject(response))
  //     .then(orderData => {
  //       this.setState({ orderHistory: orderData });
  //       console.log("order history in admin", this.state.orderHistory)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }


  render() {
    console.log("order history in admin", this.props.orderHistory)


    return (

      <div>
        {/* Copies array of keys, reverses and then loops through to get reverse chronological order */}
        {Object.keys(this.props.orderHistory).slice().reverse().map(orderNum => {


          return (
            <div className="admin__history" key={orderNum}>
              {orderNum}
              <select>
                <option value="Received">Received</option>
                <option value="In Progress">In Progress</option>
                <option value="In Transit">In Transit</option>
                <option value="Completed">Completed</option>
              </select>
              {Object.keys(this.props.orderHistory[orderNum]).map(lineItem => {
                return (
                  // console.log(this.props.orderHistory[orderNum][lineItem], lineItem)
                  <li key={lineItem} className="admin-line">

                    {this.props.orderHistory[orderNum][lineItem]} x {lineItem}

                  </li>
                )
              })
              }
            </div>
          )
        })}
      </div>
    )
  }
}

export default Admin;