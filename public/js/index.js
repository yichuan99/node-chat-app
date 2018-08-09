var socket = io();

socket.on("connect", () =>{
	console.log("Connected to server");

}); // fires whenever the server is up (persistent connection, will check for connection continuously)

socket.on("disconnect", () =>{
	console.log("Disonnected from server");
}); // fires whenever the server is down (persistent connection, will check for connection continuously)

socket.on("newMessage", function (message){
	console.log("New Message: ", message);
});