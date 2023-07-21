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
app.use(express.urlencoded({ extended: true }));

// basic routes
app.get("/", (req, res) => {
	res.redirect("/blogs");
});
app.get("/about", (req, res) => {
	res.render("about", { title: "About titans" });
});

// blog routes
app.get("/blogs", (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("index", { title: "All Blogs", blogs: result });
		})
		.catch((err) => {
			console.log(err);
		});
});
// POST HANDLER
app.post("/blogs", (req, res) => {
	console.log(req.body);
	const blog = new Blog(req.body);

	blog.save()
		.then((result) => {
			res.redirect("/blogs");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/blogs/create", (req, res) => {
	res.render("create", { title: "Create a new blog" });
});
app.get("/blogs/:id", (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render("details", { blog: result, title: "Blog Details" });
		})
		.catch((err) => {
			console.log(err);
		});
});

app.delete("/blogs/:id", (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/blogs" });
		})
		.catch((err) => {
			console.log(err);
		});
});

// 404 page
app.use((req, res) => {
	res.status(404).render("404");
});
