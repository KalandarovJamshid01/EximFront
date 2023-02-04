import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { peekaboo } from "../../PEEKABOO";
import { RootContext } from "./../../contexts/RootContext";
const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  const rootState = useContext(RootContext);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser._id);
    const getUserData = async () => {
      try {
        if (currentUser.role === "user") {
          const { data } = await axios.get(`${peekaboo}/admins/${userId}`, {
            headers: { Authorization: `Bearer ${rootState.user.token}` },
          });
          setUserData(data);
        } else {
          const { data } = await axios.get(`${peekaboo}/user/${userId}`, {
            headers: { Authorization: `Bearer ${rootState.user.token}` },
          });
          setUserData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [currentUser]);


  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.data.photo.url}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {currentUser.role === "user"
                ? userData?.data.firstName + " " + userData?.data.lastName
                : userData?.data.CN}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
