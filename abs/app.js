const express 				= require("express");
const session 				= require("express-session");
const mongoose				= require("mongoose");
const MongoStore			= require("connect-mongo")(session);
const cookieParser		= require("cookie-parser");
const bodyParser 			= require("body-parser");  		// https://github.com/expressjs/body-parser
const methodOverride 	= require("method-override");		// https://github.com/expressjs/method-override
const flash 				= require("connect-flash");
const expressValidator  = require("express-validator");
const passport				= require("passport");
const promisify			= require("es6-promisify");
const indexRoutes 		= require("./routes/index");
const profileRoutes 		= require("./routes/profile");
const helpers				= require("./helpers");
const errorHandlers 		= require("./handlers/errorHandlers");
require("./handlers/passport");

const app 						= express();

// view engine setup
app.set("view engine", "ejs");

// serves up static files from the public folder
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());

app.use(cookieParser());

app.use(methodOverride("_method"));

// necessary for flash messages
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passport is used to handle logins
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	res.locals.user = req.user || null;
	next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
	req.login = promisify(req.login, req);
	next();
});

// Routes
app.use("/", indexRoutes);
app.use("/profiles", profileRoutes);

app.use(errorHandlers.notFound);

module.exports = app;