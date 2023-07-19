const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
	//lodash
	const num = _.random(0, 10);
	console.log(num);

	// lodash demo
	const greet = _.once(() => {
		console.log("hello titans");
	});

	greet();
	greet();
	greet();
	//set header content type
	res.setHeader("Content-Type", "text/html");

	let path = "./views/";
	switch (req.url) {
		case "/":
			path += "index.html";
			res.statusCode = 200;
			break;
		case "/about":
			path += "about.html";
			res.statusCode = 200;
			break;
		case "about-me":
			res.statusCode = 301;
			res.setHeader("Location", "/about");
			res.end();
			break;
		default:
			path += "404.html";
			res.statusCode = 404;
			break;
	}

	// Send an HTML file
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			res.end();
		} else {
			//	res.write(data);
			res.end(data);
		}
	});
});

server.listen(4401, "localhost", () => {
	console.log(`listening for requests on port 4401`);
});
