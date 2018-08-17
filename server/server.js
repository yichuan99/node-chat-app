const path = require("path");
const http = require("http");
const express = require("express");
const socketIO =  require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// middleware
app.use(express.static(publicPath));

app.get("/", (req, res) => {
	res.sendFile('index.html');
})


io.on("connection", (socket) => {
	console.log("New user connected");

	// socket.emit from Admin text Welcome to the chat!
	socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));

	// socket.broadcast.emit from Admin text new user joined
	socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

	socket.on("createMessage", (message, callback) => {
		console.log("createMessage", message);
		io.emit("newMessage", generateMessage(message.from, message.text));
		callback("This is from the server.");
		// socket.broadcast.emit("newMessage", {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on("createLocationMessage", (coords) => {
		io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
	});

	socket.on("disconnect", () =>{
		console.log("Disonnected from client");
	}); 
});

// Event Listener
server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};