const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/users")
const { User } = require("./database/model");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const cor = cors({
    origin: "*"
})
app.use(cor)
app.use(express.json())
mongoose.connection.on("error", (e) => {
    console.log(e)
})
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    socket.on("hello", (m) => {
        console.log(m)
    })
});
app.post("/signup", async (req, res) => {
    console.log(req.body)
    try {
        const body = req.body;
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const user = new User({
            Name: body.Name,
            email: body.email,
            password: hashedPassword
        })
        user.save().then(arg => {
            const token = jwt.sign(
                {
                    Name: user.Name,
                    email: user.email,
                    id: user._id
                },
                process.env.JWT,
                {
                    expiresIn: "1y"
                }
            )
            res.send({
                error: false,
                data: {
                    token: token,
                    text: "User Created successfully"
                }
            })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            error: true,
            data: {
                text: "server side error"
            }
        })
    }
})
app.get("/", (req, res) => {
    res.send("test")
})
httpServer.listen(3000);