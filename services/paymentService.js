const axios = require('axios')
require('dotenv').config();
const config = {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_TOKEN}`}
};

const makePayment = async (body) => {
    const { email, totalAmount, phone, provider } = body
    const data = {
        amount: totalAmount * 100,
        email,
        currency: "GHS",
        mobile_money: {
            phone,
            provider,
        }
    }

    try {
        const res = await axios.post(process.env.CHARGE_URL, data, config)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const confirmOTP = async (body) => {
    const { otp, reference } = body
    try {
        const res = await axios.post(process.env.OTP_URL, {otp, reference}, config)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    makePayment,
    confirmOTP
}