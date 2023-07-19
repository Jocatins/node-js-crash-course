const express = require("express");
// express app
const app = express();

// register view-engine
app.set("view engine", "ejs"); // use ejs as the template engine

//listen for requests
app.listen(4401);

app.get("/", (req, res) => {
	const blogs = [
		{ title: "Hello titans", body: "love your great spirit" },
		{ title: "Hello gypsies", body: "love your great spirit" },
	];

	res.render("index", { title: "Home of titans", blogs });
});
app.get("/about", (req, res) => {
	res.render("about", { title: "About titans" });
});

app.get("/blogs/create", (req, res) => {
	res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
	res.status(404).render("404");
});
