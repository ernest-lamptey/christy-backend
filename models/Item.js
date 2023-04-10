const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type:String,
        default: "vegetables"
    }
}, {timestamps: true})


module.exports = mongoose.model('Item', itemSchema)