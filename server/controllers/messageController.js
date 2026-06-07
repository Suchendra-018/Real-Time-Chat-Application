const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const {
  sender,
  receiver,
  content,
} = req.body;

if (!content.trim()) {
  return res.status(400).json({
    message: "Message cannot be empty",
  });
}
    const message = await Message.create({
      sender,
      receiver,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          sender: senderId,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: senderId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getConversation,
};