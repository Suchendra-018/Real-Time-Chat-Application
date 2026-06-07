const User = require("../models/User");

const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    const users = await User.find({
      username: {
        $regex: keyword,
        $options: "i",
      },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  searchUsers,
};