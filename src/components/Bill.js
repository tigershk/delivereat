import React from 'react';


class Bill extends React.Component {
  constructor() {
    super();



  }



  render() {

    return (
      <div className="bill">


        <div className="bill_total--sum">
          <p>
            Subtotal: {(this.props.billTotal).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}
            <br />

          </p>
        </div>
      </div>

    )
  }

}
export default Bill;