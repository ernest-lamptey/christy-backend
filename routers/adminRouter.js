const express = require('express')
const adminRouter = express.Router()
const orderService = require('../services/orderService')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Define the LocalStrategy for authenticating with username and password
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
      // Find the user by email in your database
      const user = await User.findOne({ email });
      if (!user) {
          // If the user doesn't exist, return an error
          return done(null, false, { message: 'Incorrect email or password.' });
      }
      // Compare the hashed password with the submitted password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          // If the password doesn't match, return an error
          return done(null, false, { message: 'Incorrect email or password.' });
      }
      // If authentication succeeds, return the user object
      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));

// Define the JwtStrategy for authenticating with JSON Web Tokens
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret_key'
}, async (jwtPayload, done) => {
  try {
      // Find the user by id in your database
      const user = await User.findById(jwtPayload.id);
      if (!user) {
          // If the user doesn't exist, return an error
          return done(null, false);
      }
      // If authentication succeeds, return the user object
      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));


adminRouter.get('/', (req, res) => {
    res.send('This is the sub-router homepage.');
})


adminRouter.get('/orders', async (req, res) => {
    try {
        const response = await orderService.getAllOrders()
        res.status(200).json(response)
      } catch (error) {
        res.status(400).json({error: error.message})
      }
})

//update order status
adminRouter.put('/order', async (req, res) => {
    try {
        const response = await orderService.updateOrderStatus(req.body)
        res.status(200).json(response)
      } catch (error) {
        res.status(error.status || 500).json({error: error.message})
      }
})

module.exports = adminRouter;