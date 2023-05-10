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

const updateOrderStatus = async (body) => {
    const { orderId, orderStatus } = body
    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId }, // filter criteria
            { orderStatus: orderStatus }, // update
            { new: true } // options: return the updated document
          )
        return order
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getAllOrders = async () => {
    try {
        const items = await Order.find({})
        return items
    } catch (error) {
        console.log(error)
        throw error
    }
}

const confirmOrderPayment = async (body) => {

}

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    confirmOrderPayment
}