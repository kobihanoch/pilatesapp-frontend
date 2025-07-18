import { socket } from "../socketConfig/socketConfig";

export const createFirstSocketConnection = async (userId) => {
  socket.connect();
  socket.emit("user_loggedin", userId);
};

export const disconnectSocket = async () => {
  socket.disconnect();
};
