import React from 'react';

class LoginPopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)

  }

  //Stops page from refreshing every time a button on the form is pressed
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <header className="main__menu--article-h2">
            Welcome Back
            <br />
          </header>
          <br />
          {/* <Form onSubmit="handleSubmit" to-do > */}

          <br />
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email address"

          />
          <br />

          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"

          />

          <div className="popup__divider">
            <br />
            <button
              onClick={this.props.closePopup}
              className="popup__cancel"
            >Cancel
            </button>

            <button
              onClick={this.props.checkLogin}
              className="popup__add"
              name="Login"
            >Login
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default LoginPopup;