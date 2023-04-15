const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    items: [{
        _id: {
            type:String,
            required: true
        },
        name: {
            type: String, 
            required:true
        },
        purchaseAmount: {
            type: Number,
            required: true
        }
    }],
    email: {
        type:String
    },
    phone: {
        type: String
    },
    totalAmount:Number,
    paymentStatus: {
        type: String,
        default: "pending"
    },
    orderStatus: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})

orderSchema.pre('save', function(next) {
    this.totalAmount = this.items.reduce((total, item) => total + item.purchaseAmount, 0);
    next();
});


module.exports = mongoose.model('Order', orderSchema)