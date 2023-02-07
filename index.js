const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./model/user");
const grpMessage = require("./model/grp_message");
const prvMessage = require("./model/prv_message");
const userController = require("./controller/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const Users = mongoose.model("userSchema");
const grpMessages = mongoose.model("grpMessageSchema");
const prvMessages = mongoose.model("prvMessageSchema");
const SERVER_PORT = 8088;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:8088",
		methods: ["GET", "POST"],
		transports: ["websocket", "polling"],
		credentials: true,
	},
	allowEIO3: true,
});
app.use(cors());
mongoose.connect(`mongodb://localhost:27017/chat`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/view"));

app.use("/api/user", userController);

server.listen(SERVER_PORT || process.env.PORT, () => {
	console.log("Server Running at http://localhost:%s", SERVER_PORT);
});

const users = {};

io.on("connection", (socket) => {
	socket.on("new-user", (name) => {
		users[socket.id] = name;
		socket.broadcast.emit("user-connected", name);
	});
	socket.on("send-chat-message", (message) => {
		socket.broadcast.emit("chat-message", {
			message: message,
			name: users[socket.id],
		});
	});
	socket.on("disconnect", () => {
		socket.broadcast.emit("user-disconnected", users[socket.id]);
		delete users[socket.id];
	});
});
