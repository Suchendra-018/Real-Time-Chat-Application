const express = require("express");
const {
  sendMessage,
  getConversation,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", sendMessage);

router.get(
  "/conversation/:senderId/:receiverId",
  getConversation
);

module.exports = router;