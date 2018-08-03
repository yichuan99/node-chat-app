const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, "../public");

var app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(publicPath));

app.get("/", (req, res) => {
	res.sendFile('index.html');
})

// Event Listener
app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};