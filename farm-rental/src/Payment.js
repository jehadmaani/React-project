const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  method: { type: String, required: true }, // طريقة الدفع (PayPal, Credit Card, ...)
  details: {
    paypalEmail: { type: String, required: true }, // 
  },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
