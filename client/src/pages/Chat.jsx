import socket from "../socket/socket";
import { useEffect, useState, useRef } from "react";
import "../styles/chat.css";
import {
  searchUsers,
  getConversation,
  sendMessage,
} from "../services/authService";
import { useNavigate } from "react-router-dom";



function Chat() {
  const currentUserId =
  localStorage.getItem("userId");
  console.log("Current User ID:", currentUserId);

  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] =
  useState(null);
  const [newMessage, setNewMessage] =
  useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  console.log("Chat component loaded");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {

  const handleOnlineUsers = (users) => {
    console.log("Online Users:", users);
    setOnlineUsers(users);
  };

  socket.on(
    "online_users",
    handleOnlineUsers
  );

  socket.emit(
    "request_online_users"
  );

  return () => {
    socket.off(
      "online_users",
      handleOnlineUsers
    );
  };

}, []);


  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

useEffect(() => {
  if (!currentUserId) return;

  socket.emit(
    "join_room",
    currentUserId
  );

  console.log(
    "Joined room:",
    currentUserId
  );

  return () => {};
}, []);


useEffect(() => {
  socket.on("receive_message", (data) => {
    if (
      selectedUser &&
      (data.sender === selectedUser._id ||
        data.receiver === selectedUser._id)
    ) {
      setMessages((prev) => [
        ...prev,
        {
          _id: Date.now(),
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
        },
      ]);
    }
  });

  return () => {
    socket.off("receive_message");
  };
}, [selectedUser]);



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
  const content = newMessage.trim();

  if (!selectedUser || !content) return;

  try {
    await sendMessage({
      sender: currentUserId,
      receiver: selectedUser._id,
      content,
    });
    socket.emit("send_message", {
  sender: currentUserId,
  receiver: selectedUser._id,
  content,
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


const handleLogout = () => {
  socket.disconnect();

  localStorage.clear();

  navigate("/", {
    replace: true,
  });

  window.location.reload();
};
  return (
    <div className="chat-container">
      <div className="sidebar">
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2>GhostChat</h2>

  <button
   className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>
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
                className={
  selectedUser?._id === user._id
    ? "user-item selected-user"
    : "user-item"
}
                 onClick={() =>
                loadConversation(user)
         }
>
              <>
  <div
    style={{
      fontWeight: "bold",
      marginBottom: "4px",
    }}
  >
    {user.username}
  </div>

  <small
  style={{
    color: onlineUsers.includes(user._id)
      ? "#22c55e"
      : "#9ca3af",
  }}
>
  {onlineUsers.includes(user._id)
    ? "Online"
    : "Offline"}
</small>
</>
            </div>
          ))}
      </div>

      <div className="chat-area">

  <div className="chat-header">
    <div className="avatar"></div>

    <div>
      <h3>
        {selectedUser
          ? selectedUser.username
          : "GhostChat"}
      </h3>
    </div>
  </div>

  <div className="chat-content">

    {selectedUser ? (

      <>
        <div className="messages-container">
          
          {messages.map((message) => (
            <div
              key={message._id}
              className={
                message.sender === currentUserId
                  ? "message sent"
                  : "message received"
              }
            >
              {message.content}
              <div ref={messagesEndRef}></div>
            </div>
          ))}
        </div>

      </>

    ) : (

      <div
        style={{
          textAlign: "center",
          marginTop: "150px",
        }}
      >
        <h1>GhostChat</h1>

        <p>
          Privacy First Messaging
        </p>

        <br />

        <p>
          • One Time View Messages
        </p>

        <p>
          • Secure Conversations
        </p>

        <p>
          • Lightweight & Fast
        </p>

      </div>

    )}

  </div>

  {selectedUser && (
    <div className="message-input-container">

      <input
        className="message-input"
        value={newMessage}
        onChange={(e) =>
          setNewMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        placeholder="Type a message..."
      />

      <button
        className="send-btn"
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
