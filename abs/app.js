const port = 3000;

var app 					= require("express")();
var bodyParser 		= require("body-parser");
var methodOverride 	= require("method-override");
var User					= require("./models/user");
var profile				= require("./models/profile");

var indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use("/", indexRoutes);

app.listen(port, (err) => {
	if (err) {
		return console.log("Something bad happened", err);
	}
	console.log(`Server is listening on ${port}`);
});