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

	socket.on("disconnect", () =>{
		console.log("Disonnected from client");
	}); 
});

// Event Listener
server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};