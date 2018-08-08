var socket = io();

socket.on("connect", () =>{
	console.log("Connected to server");

	socket.emit("createEmail", {
		to: "jany@gmail.com",
		text: "Hi this is Jany!"
	});

}); // fires whenever the server is up (persistent connection, will check for connection continuously)

socket.on("disconnect", () =>{
	console.log("Disonnected from server");
}); // fires whenever the server is down (persistent connection, will check for connection continuously)

socket.on("newEmail", function (email){
	console.log("New email", email);
}); // custom event listner

socket.on("newMessage", function (message){
	console.log("New Message: ", message);
});