import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io(process.env.REACT_APP_API_URL);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("newChallenge", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });
    return () => {
      socket.off("newChallenge");
    };
  }, []);
  return (
    <div style={styles.container}>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet!</p>
      ) : (
        notifications.map((notification, index) => (
          <div key={index} style={styles.notification}>
            <h4>{notification.title}</h4>
            <p>{notification.description}</p>
            <span style={styles.tag}>{notification.difficulty}</span>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  notification: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  tag: {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "0.9rem",
  },
};

export default Notifications;
