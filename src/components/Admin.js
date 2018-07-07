import React from "react";



class Admin extends React.Component {

  constructor() {
    super();

    this.state = {
      orderStatus: '',
      orderMobile: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  handleChange(event) {

    const orderName = event.target.name

    this.setState({ orderStatus: event.target.value }, () => this.checkStatus(orderName));
  }

  checkStatus(currentOrder) {
    const custMobile = this.props.orderHistory[currentOrder].mobile;
    const custDetails = Object.assign({}, { ["mobile"]: custMobile });

    if (this.state.orderStatus === "In Transit") {
      //retrieve sms from orderhistory and populate orderMobile
      fetch('/sendsms', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ custDetails })
      })
        ;
      //   console.log("sms should be sent now");

    }

  }
  render() {
    // let myVar = "banana banana";
    return (

      <div className="admin">
        <table className="admin__table">
          <thead>
            <tr>
              <th className="admin__table--order"> Order Number</th>
              <th className="admin__table--quantity"> Quantity </th>
              <th className="admin__table--item"> Item</th>
              <th className="admin__table--contact"> Contact </th>
              <th className="admin__table--status"> Status</th>
            </tr>
          </thead>
        </table>


        {/* Copies array of keys, reverses and then loops through to get reverse chronological order */}
        {Object.keys(this.props.orderHistory).slice().reverse().map(orderNum => {

          return (
            <table className="admin__table">
              <tbody>
                <tr>
                  <th className="admin__table--order"> </th>
                  <th className="admin__table--quantity">  </th>
                  <th className="admin__table--item"> </th>
                  <th className="admin__table--contact">  </th>
                  <th className="admin__table--status"> </th>
                </tr>

                <tr key={orderNum}>
                  <td> {orderNum}</td>
                  <td></td>
                  <td></td>

                  <td> 0776 207 1057 </td>
                  <td> <select className="status__menu" name={orderNum} value={this.state.orderStatus} onChange={this.handleChange} >
                    <option value="Received">Received</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  </td>
                </tr>
                {Object.keys(this.props.orderHistory[orderNum]).map(lineItem => {
                  if (lineItem === "mobile") return;
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
              </tbody>
            </table>
          )
        })}
      </div>
    )
  }
}

export default Admin;