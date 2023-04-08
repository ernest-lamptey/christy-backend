const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const orderService = require('./services/orderService')
const paymentService = require('./services/paymentService')

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

// User registration endpoint
app.get('/api/register', (req, res) => {
  res.status(200).json("received")
});

// Order saving endpoint
app.post('/api/v1/orders', async (req, res) => {
  try {
    const orderResponse = await orderService.createOrder(req.body)
    res.status(200).send(orderResponse)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
});

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

