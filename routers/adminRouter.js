const express = require('express')
const adminRouter = express.Router()
const orderService = require('../services/orderService')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken');


// Define the LocalStrategy for authenticating with username and password
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
      // Find the user by email in your database
      const admin = await Admin.findOne({ email });
      if (!admin) {
          // If the user doesn't exist, return an error
          return done(null, false, { message: 'Incorrect email or password.' });
      }
      // Compare the hashed password with the submitted password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
          // If the password doesn't match, return an error
          return done(null, false, { message: 'Incorrect email or password.' });
      }
      // If authentication succeeds, return the user object
      return done(null, admin);
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
      const admin = await Admin.findById(jwtPayload.id);
      if (!admin) {
          // If the user doesn't exist, return an error
          return done(null, false);
      }
      // If authentication succeeds, return the user object
      return done(null, admin);
  } catch (error) {
      return done(error);
  }
}));


adminRouter.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({email, password: hashedPassword });
      await newAdmin.save();
      res.status(201).json({ message: 'Admin user created successfully.'})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occured while creating the admin user'})
    }
})

// Define a route for handling login requests
adminRouter.post('/login', async (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, admin, info) => {
        try {
            if (err || !admin) {
                // If authentication fails, return an error
                return res.status(401).json({
                    message: 'Incorrect email or password.',
                    admin: admin
                });
            }
            // If authentication succeeds, create a JWT
            const token = jwt.sign({ id: admin._id }, 'your_jwt_secret_key', { expiresIn: '1d' });
            return res.status(200).json({ admin, token });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

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