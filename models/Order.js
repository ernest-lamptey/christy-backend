const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    items: [{
        name: {
            type: String, 
            required:true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    paymentRef: {
        type:String
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    orderStatus: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})


module.exports = mongoose.model('Order', orderSchema)