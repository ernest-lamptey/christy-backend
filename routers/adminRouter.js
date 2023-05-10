const express = require('express')
const adminRouter = express.Router()
const orderService = require('../services/orderService')


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