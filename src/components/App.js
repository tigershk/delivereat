import React from 'react';
import Results from "./Results";

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
          <img src='./static/pizzalogo.png' className="header__logo" /><h1>Pizza Right Now!</h1>
          <div class="header__media">
            <img src="./static/twitter.png" height="50px" />
          </div>
          <h2>☎ 0777 112 8224</h2>
        </div>

        <Results menu={this.state.menu} />

      </div>
    )
  }
}

export default App;