var socket = io();

socket.on("connect", () =>{
	console.log("Connected to server");

}); // fires whenever the server is up (persistent connection, will check for connection continuously)

socket.on("disconnect", () =>{
	console.log("Disonnected from server");
}); // fires whenever the server is down (persistent connection, will check for connection continuously)

socket.on("newMessage", function (message){
	console.log("New Message: ", message);
	var li = jQuery("<li></li>"); // use jQuery to create element and add it to the page
	li.text(`${message.from}:${message.text}`);

	jQuery("#messages").append(li);
});	

jQuery("#message-form").on("submit", function (e) {
	e.preventDefault();

	socket.emit("createMessage", {
		from: "User",
		text: jQuery("[name=message]").val()
	}, function () {

	});
});