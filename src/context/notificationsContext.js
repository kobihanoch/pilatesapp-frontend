import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToReceivedMessages } from "../services/socketService";
import { socket } from "../socketConfig/socketConfig";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // Update messages when received from the server
  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    subscribeToReceivedMessages(handleNewMessage);

    return () => socket.off("received_messages", handleNewMessage);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      console.log("New message:", messages);
    }
  }, [messages]);

  return (
    <NotificationsContext.Provider value={{ messages, setMessages }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsProvider"
    );
  }
  return context;
};
