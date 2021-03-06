import React from 'react';
import MenuItems from "./MenuItems";
import Order from "./Order";
import Login from "./Login";
import Admin from "./Admin";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      order: {},
      admin: false,
      orderHistory: {}
    }

    this.getmenu = this.getmenu.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.repeatOrder = this.repeatOrder.bind(this);
    this.amendOrder = this.amendOrder.bind(this);
    this.receiveAdmin = this.receiveAdmin.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this)
  }

  getmenu() {
    fetch('/menu')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(json => {
        this.setState({
          menu: Object.values(json)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getmenu()
  }

  createOrder(orderName, orderQuantity) {

    const custOrder = (Object.keys(this.state.order)).indexOf(orderName) === -1 ?
      (Object.assign({}, this.state.order, { [orderName]: orderQuantity })) :
      (Object.assign({}, this.state.order, { [orderName]: orderQuantity + this.state.order[orderName] }))

    this.setState({ order: custOrder })

  }

  deleteOrder() {

    this.setState({ order: {} })
  }

  amendOrder(orderName, orderQuantity) {

    let custOrder;
    if (orderQuantity === 0) {
      //delete that order from state make a copy and set it

      custOrder = Object.assign({}, this.state.order);
      delete custOrder[orderName];
    }
    else {

      custOrder = (Object.assign({}, this.state.order, { [orderName]: orderQuantity }))
    }

    this.setState({ order: custOrder })

  }

  repeatOrder(repeatOrder) {
    this.setState({ order: repeatOrder });
  }
  receiveAdmin(verification) {

    if (verification) {
      this.setState({ admin: true });
      //Retrieve order from server and set in orderHistory state

      fetch('/orders')
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(orderData => {
          this.setState({ orderHistory: orderData });
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      this.setState({ admin: false });
    }
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <header className="title">KEN'S KITCHEN</header>
          <div className="header__right">
            <a href="https://www.facebook.com/kenchowkitchen/" target="_blank">
              <img src="./static/fb-bw.png" className="header__fbimg"
              />
            </a>
            <a href="https://www.instagram.com/explore/locations/1032455974/kens-kitchen-london/?hl=en" target="_blank">
              <img src="./static/instagram-bw.png" className="header__img"
              />
            </a>
            ☎ 020 7033 0447
          </div>
          <Login receiveAdmin={this.receiveAdmin} />


        </div>
        {(this.state.admin) ?
          <div className="main__admin">
            <Admin orderHistory={this.state.orderHistory} /> </div> :
          <div className="main">
            <MenuItems menu={this.state.menu}
              createOrder={this.createOrder} />

            <Order order={this.state.order}
              menu={this.state.menu}
              receiveRepeatOrder={this.repeatOrder}
              amendOrder={this.amendOrder}
              deleteOrder={this.deleteOrder}
              delete />
          </div>
        }
      </div>
    )
  }
}

export default App;