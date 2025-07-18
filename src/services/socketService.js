import { socket } from "../socketConfig/socketConfig";

export const createFirstSocketConnection = async (userId) => {
  socket.connect();
  socket.emit("user_loggedin", userId);
};

export const disconnectSocket = async () => {
  socket.disconnect();
};

// Listeners
export const subscribeToReceivedMessages = (callback) => {
  console.log("Messages listener is on...");
  socket.on("received_messages", callback);
};
