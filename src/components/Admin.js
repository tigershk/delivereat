import React from "react";



class Admin extends React.Component {

  constructor() {
    super();

    this.state = {
      orderStatus: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  handleChange(event) {
    this.setState({ orderStatus: event.target.value }, () => this.checkStatus());
  }

  checkStatus() {

    if (this.state.orderStatus === "In Transit") {
      //send sms

      fetch('/sendsms', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: +447762071057 })
      })
        ;
      //   console.log("sms should be sent now");

    }

  }
  render() {

    return (

      <div className="admin">
        {/* Copies array of keys, reverses and then loops through to get reverse chronological order */}
        {Object.keys(this.props.orderHistory).slice().reverse().map(orderNum => {

          return (
            <table className="admin__table">
              <tr>
                <th className="admin__table--order"> Order Number</th>
                <th className="admin__table--quantity"> Quantity </th>
                <th className="admin__table--item"> Item</th>
                <th className="admin__table--contact"> Contact </th>
                <th className="admin__table--status"> Status</th>
              </tr>
              <tr>
                <td> {orderNum}</td>
                <td></td>
                <td></td>

                <td> 0776 207 1057 </td>
                <td> <select className="status__menu" value={this.state.orderStatus} onChange={this.handleChange} >
                  <option value="Received">Received</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
                </td>
              </tr>
              {Object.keys(this.props.orderHistory[orderNum]).map(lineItem => {
                return (
                  <tr>
                    <td></td>
                    <td> {this.props.orderHistory[orderNum][lineItem]} </td>
                    <td> {lineItem}</td>
                    <td></td>
                    <td></td>

                  </tr>
                )
              })}
            </table>
          )
        })}
      </div>
    )
  }
}

export default Admin;