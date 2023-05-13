const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const paymentService = require('./services/paymentService')
const itemService = require('./services/itemService')
const orderService = require('./services/orderService')
const adminRouter = require('./routers/adminRouter')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});

// User registration endpoint - Only for testing...
app.use('/api/v1/admin', adminRouter)

app.get('/api/register', (req, res) => {
  res.status(200).json("received")
});

//add item to database
app.post('/api/v1/add-item', async (req, res) => {
  try{
    const response = await itemService.addItem(req.body)
    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

//get all items from database
app.get('/api/v1/items', async (req, res) => {
  try {
    const response = await itemService.getAllItems()
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// Order saving endpoint
app.post('/api/v1/orders', async (req, res) => {
  try {
    const orderResponse = await orderService.createOrder(req.body)
    res.status(201).send(orderResponse)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

app.post('/api/v1/pay', async (req, res) => {
  console.log("hit route")
  try {
    const paymentResponse = await paymentService.makePayment(req.body)
    res.status(201).send(paymentResponse)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

app.post('api/v1/confirmOTP', async (req, res) => {
  try {
    const response = paymentService.confirmOTP(req.body)
    //add payment reference to order
    //change payment status to "processing"
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
})

app.post('api/v1/webhook/url', (req, res) => {
  const event = req.body;
  //change payment status to "confirmed"
  console.log(event)
  res.send(200);
})

