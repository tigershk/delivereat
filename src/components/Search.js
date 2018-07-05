import React from 'react';

//Don't think I need this component

class Search extends React.Component {
  constructor() {
    super();
    // this.state = 'hello'
  }

  componentDidMount() {
    this.getmenu()
  }

  getmenu() {
    fetch('/menu')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(menuDetails => this.props.receiver(menuDetails)
      )
      .catch(err => {
        console.log(err)
      })

    console.log(this.state.menu)
  }

  render() {
    return (
      <div>
        Search
      </div>
    )
  }

}

export default Search