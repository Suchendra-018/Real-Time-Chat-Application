
import "../styles/chat.css";
import { useEffect, useState } from "react";
import {
  searchUsers,
  getConversation,
  sendMessage,
} from "../services/authService";

function Chat() {
  const username = localStorage.getItem("username");
  const currentUserId =
  localStorage.getItem("userId");

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] =
  useState(null);
  const [newMessage, setNewMessage] =
  useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await searchUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadConversation = async (user) => {
  try {
    setSelectedUser(user);

    const data = await getConversation(
      currentUserId,
      user._id
    );

    setMessages(data);
  } catch (error) {
    console.log(error);
  }
};
const handleSendMessage = async () => {
  if (!selectedUser) return;

  try {
    await sendMessage({
      sender: currentUserId,
      receiver: selectedUser._id,
      content: newMessage,
    });

    const data = await getConversation(
      currentUserId,
      selectedUser._id
    );

    setMessages(data);
    setNewMessage("");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>GhostChat</h2>

        <p>{username}</p>

        <input
          className="search-box"
          placeholder="Search username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {users
  .filter(
    (user) =>
      user._id !== currentUserId &&
      user.username
        .toLowerCase()
        .includes(search.toLowerCase())
  )
          .map((user) => (
            <div
                key={user._id}
                className="user-item"
                 onClick={() =>
                loadConversation(user)
         }
>
              {user.username}
            </div>
          ))}
      </div>

      <div className="chat-area">
  <h2>
    {selectedUser
      ? selectedUser.username
      : "Select a User"}
  </h2>

  <div>
    {messages.map((message) => (
      <p key={message._id}>
        {message.content}
      </p>
    ))}
  </div>

  {selectedUser && (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <input
        value={newMessage}
        onChange={(e) =>
          setNewMessage(e.target.value)
        }
        placeholder="Type message..."
      />

      <button
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  )}
</div>
    </div>
  );
}

export default Chat;