import React from 'react';
import Results from "./Results";
import Bill from "./Bill";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],

    }

    this.getmenu = this.getmenu.bind(this)
    this.receiver = this.receiver.bind(this)
  }

  getmenu() {
    fetch('/menu')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(json => {
        this.setState({
          menu: Object.values(json),
          order: {}// concise object containing pizza id : quantity
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getmenu()
  }

  receiver(custOrder) {
    // console.log(this.state.order)
    this.setState({ order: custOrder })
    console.log("in app orders are: ", this.state.order)
  }

  render() {
    // console.log(this.state.menu)

    return (
      <div className="App">
        <div className="header">
          <img src='./static/pizzalogo.png' className="header__logo" /><h1>Pizza Right Now!</h1>
          <div className="header__media">
            <img src="./static/twitter.png" height="50px" />
          </div>
          <h2>☎ 0777 112 8224     </h2>
        </div>
        <div className="menu">
          <Results menu={this.state.menu} receiver={this.receiver} order={this.state.order} />
          <Bill order={this.state.order} menu={this.state.menu} />
        </div>
      </div>
    )
  }
}

export default App;