import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

const socket = io("ws://127.0.0.1:3000/");

socket.emit("hello", "world");