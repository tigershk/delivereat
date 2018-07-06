import React from "react";
import LoginPopup from "./LoginPopup";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.checkLogin = this.checkLogin.bind(this)
  }

  //toggle login popup on and off
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.props.receiveAdmin(false)
  }
  //toggle login popup on and off
  checkLogin(event) {
    if (event.target.name = "Login") {
      console.log("you logged in!")
      //Fetch username and password from database and verify here
    }

    this.setState({
      showPopup: !this.state.showPopup
    });

    this.props.receiveAdmin(true)
  }

  render() {
    return (
      <div className="Login">
        <button
          type="submit" className="header__login"
          onClick={this.togglePopup}>
          Login
        </button>

        {this.state.showPopup ?
          <LoginPopup
            closePopup={this.togglePopup}
            checkLogin={this.checkLogin} />
          : null
        }
      </div>
    )
  }
}

export default Login;