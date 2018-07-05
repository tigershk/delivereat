import React from "react";

function MenuItem({ menuItem, receiveOrder }) {


  // Click handler for adding and decreasing quantities of pizza
  function handleChange(event) {
    event.preventDefault();

    console.log(event.target.name, event.target.value)

    receiveOrder(event.target.name, event.target.value);

  }


  // Displays menu items on offer with photos
  return (
    <div className="menu__item" >
      <img src={menuItem.img}
        className="menu__item--pic" alt={menuItem.name}
      />
      <div className="menu__item--text">
        <h2>{menuItem.name}<br />
          {(menuItem.price).toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}

          <br />
          <button
            type="submit"
            onClick={handleChange}
            className="menu__item--delete"
            name={menuItem.name}
            value="decrease"
          >▼
          </button>

          <button
            type="submit"
            onClick={handleChange}
            className="menu__item--confirm"
            name={menuItem.name}
            value="increase"
          >▲
          </button>
        </h2>
      </div>
    </div >

  );

}

export default MenuItem;