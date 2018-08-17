var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
	it("should generate the correct message object", () => {
		// store res in variable
		// assert from match
		// assert text match
		// assert createdAt is a number
		var from = "John";
		var text = "My Message";
		var message = generateMessage(from, text);
		expect(typeof message.createdAt).toBe("number");
		expect(message).toMatchObject({from,text});

	});
});

describe("generateLocationMessage", () => {
	it("should generate correct location object", () => {
		var from = "John";
		var latitude = 12;
		var longitude = 35;
		var url = "https://www.google.com/maps?q=12,35";
		var message = generateLocationMessage(from, latitude, longitude);

		expect(typeof message.createdAt).toBe("number");
		expect(message).toMatchObject({from,url});
	});
})