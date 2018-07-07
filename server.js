const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// import keys from './twiliokeys';
const accountSid = "ACb43bace59bfbef821723be7b56b1b7a6";
const authToken = "2e1f9e637912d69716ea8c490efb4033";
const client = require('twilio')(accountSid, authToken);


app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1: {
    id: 1,
    name: "Bacon bap",
    category: "breakfast",
    price: 2.80
  },
  2: {
    id: 2,
    name: "Sausage bap",
    category: "breakfast",
    description: "",
    price: 2.80
  },
  3: {
    id: 3,
    name: "Egg & Cress bap",
    category: "breakfast",
    description: "",
    price: 2.20
  },
  4: {
    id: 4,
    name: "Porridge with berry compote or coconut jam",
    category: "breakfast",
    description: "",
    price: 1.90
  },
  5: {
    id: 5,
    name: "Beef Rendang with rice",
    category: "lunch",
    description: "Slow cooked topsite of beef in a rich lemongrass and coconut milk curry",
    price: 6.90
  },
  6: {
    id: 6,
    name: "Malaysian Chicken Curry with rice",
    category: "lunch",
    description: "Chicken and long beans cooked with yidu chillies, blend of herbs and coconut milk",
    price: 5.90
  },
  7: {
    id: 7,
    name: "Aubergine Curry with rice",
    category: "lunch",
    description: "Aubergines moorishly infused with yidu chillies, blend of herbs and coconut milk",
    price: 5.90
  },
  8: {
    id: 8,
    name: "Laksa Noodles",
    category: "lunch",
    description: "King prawns and tofu in a spicy seafood broth served with traditional boiled egg  & noodles",
    price: 6.90
  },
  9: {
    id: 9,
    name: "Grilled dumplings",
    category: "side",
    description: "Little parcels of veggie goodness served with a rice vinegar dip",
    price: 2.90
  },
  10: {
    id: 10,
    name: "Spring rolls",
    category: "side",
    description: "Mini veggie rolls served with a sweet chilli dip",
    price: 2.90
  }
};

let lastOrderId = 457; //order numbering starts from 457
let orders = {};

app.get('/', (req, res) => {
  res.render('index');
});

// Retrieve all menu items 
app.get('/menu', (req, res) => {
  res.json(menu);
});

// Retrieve specified menu item
app.get('/menu/:menuItemId', (req, res) => {
  const item = menu[req.params.menuItemId];
  if (item) {
    res.json(item)
  }
  else {
    res.status(404).json({ error: 'Sorry, menu item not found' })
  }
});

// Retrieve all orders
app.get('/orders', (req, res) => {
  // console.log("server orders", orders)
  res.json(orders)
})

// Create new order
app.post('/orders', (req, res) => {
  const newOrder = req.body;
  lastOrderId++;
  orders[lastOrderId] = newOrder;
});

// Update current order
app.patch('/update/:{ordertoUpdate}', (req, res) => {
  const update = req.body;

  orders[req.params.ordertoUpdate] = Object.assign({},
    orders[req.params.ordertoUpdate],
    update
  );

  res.json(update);
});

// Delete specified order
app.delete('/delete/:orderToDelete', (req, res) => {
  console.log("order to delete on server", req.params.orderToDelete)
  const key = req.params.orderToDelete;
  delete orders[key];
  console.log("delete was successful")
  res.status(204).json({ ok: "Delete was successful" })
});

app.post('/sendsms', bodyParser.json(), (req, res) => {
  console.log("hllo")
  client.messages.create({
    to: "+447762071057",//req.body.data, //"+447762071057",
    from: "+441298918018",
    body: "Your order is on it's way!"
  })
    .then((message) => console.log(message.sid))
})

app.listen(8080, () => {
  console.log('127.0.0.1:8080');
});

