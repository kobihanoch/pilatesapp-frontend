const hostname = window.location.hostname;

const isLocalNetwork =
  hostname === "localhost" ||
  hostname.startsWith("192.168") ||
  hostname.startsWith("10.") ||
  hostname.startsWith("172.");

const port = "5000";

export const API_BASE_URL = isLocalNetwork
  ? `http://${hostname}:${port}/api`
  : "";
