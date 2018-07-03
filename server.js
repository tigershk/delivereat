const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1: {
    id: 1,
    name: "Pepperoni Feast",
    img: "./static/pepperoni.jpg",
    price: 14.99
  },
  2: {
    id: 2,
    name: "Veggiesaurus",
    img: "./static/veggiesaurus.jpg",
    price: 12.99
  },
  3: {
    id: 3,
    name: "Chicken Supreme",
    img: "./static/chicken.jpg",
    price: 14.99
  },
  4: {
    id: 4,
    name: "Veggie Sizzler",
    img: "./static/margherita.jpg",
    price: 12.99
  },
  5: {
    id: 5,
    name: "Chicken Strips",
    img: "./static/chickenStrips.jpg",
    price: 7.99
  },
  6: {
    id: 6,
    name: "Potato Wedges",
    img: "./static/wedges.jpg",
    price: 6.99
  },
  7: {
    id: 7,
    name: "Mixed Leaf Salad",
    img: "./static/salad.jpg",
    price: 12.99
  },
  8: {
    id: 8,
    name: "Cheesy Garlic Bread",
    img: "./static/garlicbread.jpg",
    price: 14.99
  },
  9: {
    id: 9,
    name: "Chocolate Ice Cream",
    img: "./static/icecream.jpg",
    price: 4.99
  }
};

let lastOrderId = 457; //order numbering starts from 457
let orders = {};

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/menu', function (req, res) {
  res.json(menu);
});

app.get('/delete/:{orderToDelete}', function (req, res) {
  res.json(orders);
});

app.get('/orders', function (req, res) {
  console.log("server orders", orders)
  res.json(orders)
  // res.render('admin', orders);
})

app.get('/menu/:menuItemId', function (req, res) {
  const item = menu[req.params.menuItemId];
  if (item) {
    res.json(item)
  }
  else {
    res.status(404).json({ error: 'Sorry, menu item not found' })
  }
});

app.post('/orders', function (req, res) {
  const newOrder = req.body;
  lastOrderId++;
  orders[lastOrderId] = newOrder;
});

app.delete('/delete/:orderToDelete', function (req, res) {
  console.log("order to delete on server", req.params.orderToDelete)
  const key = req.params.orderToDelete;
  delete orders[key];
  console.log("delete was successful")
  res.status(204).json({ ok: "Delete was successful" })
});

app.listen(8080, function () {
  console.log('127.0.0.1:8080');
});

