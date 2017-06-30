const mongoose = require("mongoose");

// import environment variables from variables.env
require("dotenv").config({ path: "variables.env" });

// connect to our database and handle a bad connection
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
	console.error(`Mongoose error: ${err.message}`);
});

// import all mongoose models
require("./models/Profile")
require("./models/User")

// start the app
const app = require("./app");
app.set("port", process.env.PORT || 8000);
const server = app.listen(app.get("port"), () => {
	console.log(`Express running on PORT: ${server.address().port}`);
});