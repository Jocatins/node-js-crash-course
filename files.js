const fs = require("fs");

// reading files
// This is an async process
fs.readFile("./docs/blog1.txt", (err, data) => {
	if (err) {
		console.log(err);
	}
	console.log(data.toString());
});

// writing files
fs.writeFile("./docs/blog2.txt", "hello gypsies", () => {
	console.log("file was written");
});

// Working with directories
if (!fs.existsSync("./assets")) {
	fs.mkdir("./assets", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("folder created");
	});
} else {
	fs.rmdir("./assets", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("folder deleted");
	});
}

// Deleting files
// if (fs.existsSync("./docs/blog2.txt")) {
// 	fs.unlink("./docs/blog2.txt", (err) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		console.log("file deleted");
// 	});
// }
