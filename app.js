const express = require("express");
// express app
const app = express();

const mongoose = require("mongoose");
const Blog = require("./models/blog");

// connect to mongodb
const dbURI =
	"mongodb+srv://jocatins:sphinx007@sphinxdb.gwd8s.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		//listen for requests
		app.listen(4401);
		console.log("Connected To Database");
	})
	.catch((err) => console.log(err));
// register view-engine
app.set("view engine", "ejs"); // use ejs as the template engine

// middleware and static files
app.use(express.static("public"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
	const blog = new Blog({
		title: "titan blogs",
		snippet: "About titans",
		body: "More about titans",
	});
	blog.save()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// ----------------------ALL BLOGS------------------------------------------
app.get("/all-blogs", (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});
// -------------------SINGLE BLOGS-------------------------------------------
app.get("/single-blog", (req, res) => {
	Blog.findById("64b9498f8f820547eca17dce")
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

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
