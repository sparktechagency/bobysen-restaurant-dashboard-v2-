import { io } from "socket.io-client";
const URL = "http://192.168.10.138:9005";

export const socket = io(URL);
