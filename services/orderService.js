const Order = require('../models/Order')

const createOrder = async (body) => {
    const { items } = body
    try {
        const order = await Order.create({ items })
        return order
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