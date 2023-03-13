const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// User registration endpoint
app.post('/api/register', (req, res) => {
  // Handle user registration logic
});

// Order saving endpoint
app.post('/api/orders', (req, res) => {
  // Handle order saving logic
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
