const path = require("path");
const http = require("http");
const express = require("express");
const socketIO =  require("socket.io");

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
	socket.emit("newMessage", {
		from: "Admin",
		text: "Welcome to the chat room!",
		createdAt: new Date().getTime()
	});

	// socket.broadcast.emit from Admin text new user joined
	socket.broadcast.emit("newMessage", {
		from: "Admin",
		text: "New user joined",
		createdAt: new Date().getTime()
	});
	
	socket.on("createMessage", (message) => {
		console.log("createMessage", message);
		io.emit("newMessage", {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
		// socket.broadcast.emit("newMessage", {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
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