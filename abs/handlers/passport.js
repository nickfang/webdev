const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("ABSUser");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());