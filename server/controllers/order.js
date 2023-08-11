import Order from "../models/order.js"
import user from "../models/user.js";
import Chat from "../models/chat.js"; 
const createOrder = async (req, res, next) => {
  try {
    const {
      orderId,
      from,
      to,
      quantity,
      pickupAddress,
      transporter,
      transporterId,
      manufacturer
    } = req.body;

    const newOrder = await Order.create({
      orderId,
      from,
      to,
      quantity,
      pickupAddress,
      transporter,
      manufacturer,
      userId: req.user.userId,
      transporterId
    });

    res.status(201).json(newOrder);
    next();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the order.' });
  }
};

const getManufacturerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
};
const getTransporterOrders = async (req, res) => {
  try {
    const orders = await Order.find({ transporterId: req.user.userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
};

const getChats = async (req, res) => {
  try {
    const orderId = req.params.room;
    const chats = await Chat.find({ order: orderId });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch chats." });
  }
};


const getTransporters = async (req, res) => {
  try {
    const transporters = await user.find({ role: "Transporter" }); 
    res.status(200).json(transporters);
  } catch (error) {
    console.error("Error fetching transporters:", error);
    res.status(500).json({ error: 'An error occurred while fetching transporters.' });
  }
};
export { createOrder,getTransporters ,getManufacturerOrders,getChats,getTransporterOrders}