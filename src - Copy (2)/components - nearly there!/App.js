import React from 'react';
import MenuItems from "./MenuItems";
import Order from "./Order";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      order: {}
    }

    this.getmenu = this.getmenu.bind(this);

    this.createOrder = this.createOrder.bind(this);
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

  render() {
    // console.log(this.state.menu)

    return (
      <div className="App">
        <div className="header">
          <h1>Ken's Kitchen</h1>
          <div className="header__media">
            <img src="./static/twitter.png" height="50px" />
          </div>
          <h2>☎ 0777 112 8224</h2>
        </div>

        <MenuItems menu={this.state.menu}
          createOrder={this.createOrder} />

        <Order order={this.state.order}
          menu={this.state.menu} />


      </div>
    )
  }
}

export default App;