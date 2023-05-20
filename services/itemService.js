const Item = require('../models/Item') 

const addItem = async (body) => {
    const {name, photoUrl, price} = body
    try {
        const item = await Item.create({name, photoUrl, price})
        return item
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getAllItems = async () => {
    try {
        const items = await Item.find({})
        return items
    } catch (error) {
        console.log(error)
        throw error
    }
}

const updateItemPrice = async (body) => {
    const { itemId, price } = body
    try {
        const item = await Item.findOneAndUpdate(
            { _id: itemId }, // filter criteria
            { price: price }, // update
            { new: true } // options: return the updated document
          )
        return item
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    addItem,
    getAllItems,
    updateItemPrice
}