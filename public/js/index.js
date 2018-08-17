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

socket.on("newLocationMessage", function(message){
	var li = jQuery("<li></li>");
	var a = jQuery("<a target='_blank'>My Current Location</a>");

	li.text(`${message.from}: `);
	a.attr("href", message.url);
	li.append(a);

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

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		alert("Unable to fetch location.");
	});
}); // listens to the button click event