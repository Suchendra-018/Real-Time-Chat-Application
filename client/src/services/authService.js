import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};
export const signupUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/signup`,
    userData
  );

  return response.data;
};
export const searchUsers = async (search = "") => {
  const response = await axios.get(
    `http://localhost:5000/api/users/search?search=${search}`
  );

  return response.data;
};
export const getConversation = async (
  senderId,
  receiverId
) => {
  const response = await axios.get(
    `http://localhost:5000/api/messages/conversation/${senderId}/${receiverId}`
  );

  return response.data;
};
export const sendMessage = async (messageData) => {
  const response = await axios.post(
    "http://localhost:5000/api/messages",
    messageData
  );

  return response.data;
};