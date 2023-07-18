const fs = require("fs");

// Read Streams
const readStream = fs.createReadStream("./docs/blog3.txt", {
	encoding: "utf-8",
});
//Write Stream
const writeStream = fs.createWriteStream("./docs/blog5.txt");

// readStream.on("data", (chunk) => {
// 	console.log("----- New Chunk ----------");
// 	console.log(chunk);
// 	writeStream.write("\nNew Chunk\n");
// 	writeStream.write(chunk);
// });

// Pipes
readStream.pipe(writeStream);
