// import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema({
//   orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
//   messages: [
//     {
//       sender: { type: String, required: true },
//       content: { type: String, required: true },
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
// });

// const Chat = mongoose.model("Chat", chatSchema);

// export default Chat;
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  order: { type: String, ref: "Order", required: true },
  messages: [
    {
      sender: { type: String, required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
