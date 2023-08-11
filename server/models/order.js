import mongoose from "mongoose"
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  transporter: { type: String, required: true },
  manufacturer:{ type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Order = mongoose.model("Order", orderSchema);
export default Order
