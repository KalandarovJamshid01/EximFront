import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { peekaboo } from "../../PEEKABOO";
import { RootContext } from "./../../contexts/RootContext";
import axios from "axios";
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const rootState = useContext(RootContext);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser._id);
    const getUserData = async () => {
      try {
        if (currentUser.role === "user") {
          const { data } = await axios.get(`${peekaboo}/admins/${userId}`, {
            headers: { Authorization: `Bearer ${rootState.user.token}` },
          });
          console.log(data);
          setUserData(data);
        } else {
          const { data } = await axios.get(`${peekaboo}/user/${userId}`, {
            headers: { Authorization: `Bearer ${rootState.user.token}` },
          });
          console.log(data);

          setUserData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser._id,
      text: newMessage,
      conversation_id: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser._id);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (
      receivedMessage !== null &&
      receivedMessage.conversation_id === chat?._id
    ) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={userData?.data?.photo?.url}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {currentUser.role === "user"
                        ? userData?.data.firstName +
                          " " +
                          userData?.data.lastName
                        : userData?.data.CN}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message, key) => (
                <>
                  <div
                    ref={scroll}
                    key={key}
                    className={
                      message.sender === currentUser._id
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
