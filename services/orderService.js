const Order = require('../models/Order')
const paymentService = require('../services/paymentService')

const createOrder = async (body) => {
    const {items, email, phone, totalAmount, provider } = body
    try {
        const order = await Order.create({ items, email, phone, totalAmount, provider })
        const payment = await paymentService.makePayment(order)
        return payment
    } catch (error) {
        console.log(error)
        throw error
    }
}

const confirmOrderPayment = async (body) => {

}

module.exports = {
    createOrder,
    confirmOrderPayment
}