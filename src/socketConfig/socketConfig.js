import { io } from "socket.io-client";

// This file conatins the choice between production and development environment,
//  to know to which server the requests will be sent
// The server needs to be running in the background
// If running on LOCALHOST then DEVLOPMENT server will be used
// If running on PRODUCTION then PRODUCTION server will be used

const hostname = window.location.hostname;

// Uncomment by production or dev environment

// ------{PRODUCTION}-------
//export const SOCKET_URL = process.env.REACT_APP_API_BASE_URL;

// ------{DEVELOPMENT}-------
const SOCKET_URL = `http://${hostname}:5000`;

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});
