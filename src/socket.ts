import { io } from "socket.io-client";
const URL = "http://192.168.10.3:9000";

export const socket = io(URL);
