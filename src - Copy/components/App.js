import React from 'react';
import MenuItems from "./MenuItems";

class App extends React.Component {
  constructor() {
    super();
    this.state = { menu: [] }

    this.getmenu = this.getmenu.bind(this)
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

  render() {
    // console.log(this.state.menu)

    return (
      <div className="App">
        <div className="header">
          {/* <img src='./static/pizza- colour.png' className="header__logo" /> */}
          <div className="header__heading">
            <h1>Pizza Right Now</h1>
          </div>
          <div className="header__media">
            <img src="./static/facebook.png" className="header__media--fb" />

            <img src="./static/twitter.png" className="header__media--twitter" />


            <h2>☎ 0777 112 8224</h2>
          </div>
        </div>
        <MenuItems menu={this.state.menu} />

      </div>
    )
  }
}

export default App;