const express = require("express");
// express app
const app = express();

const mongoose = require("mongoose");
const BlogRoutes = require("./routes/blogRoutes");

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
app.use(BlogRoutes);

// 404 page
app.use((req, res) => {
	res.status(404).render("404");
});
