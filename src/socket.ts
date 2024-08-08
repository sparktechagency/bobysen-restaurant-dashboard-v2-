import { io } from "socket.io-client";
const URL = "https://socket.bookatable.mu";

export const socket = io(URL);
