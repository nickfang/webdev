// const port = 3000;

const express 				= require("express");
const session 				= require("express-session");
const bodyParser 			= require("body-parser");  		// https://github.com/expressjs/body-parser
const mongoose				= require("mongoose");
const methodOverride 	= require("method-override");		// https://github.com/expressjs/method-override
const flash 				= require("connect-flash");
const User					= require("./models/user");
const profile				= require("./models/profile");
const indexRoutes 		= require("./routes/index");
const profileRoutes 		= require("./routes/profile");
const helpers				= require("./helpers");
const errorHandlers 		= require("./handlers/errorHandlers");

var app 					= express();

// view engine setup
app.set("view engine", "ejs");

// serves up static files from the public folder
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));

// necessary for flash messages
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
}));

app.use(flash());

app.use((req, res, next) => {
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	next();
});

// Routes
app.use("/", indexRoutes);
app.use("/profiles", profileRoutes);

app.use(errorHandlers.notFound);

module.exports = app;