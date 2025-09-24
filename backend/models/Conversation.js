const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["user", "assistant", "system"],
    },
    content: {
      type: String,
      required: true,
    },
    Coment: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);


const ConversationSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
    required: true,
  },
  messages: [MessageSchema]
},{timestamps:true});


module.exports = mongoose.model('Conversation',ConversationSchema)