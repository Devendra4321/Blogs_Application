if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
var methodOverride = require("method-override");
const blogRouter = require("./routes/blog.js");
const userRouter = require("./routes/user.js");
const flash = require("connect-flash");
const session = require("express-session");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const app = express();
const port = process.env.PORT_NO;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

//mongoose connection
main()
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err.message));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blogDatabase");
}

//setup session options
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

//setup session
app.use(session(sessionOptions));
//setup flash for popup messages
app.use(flash());

//passport npm package
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // res.locals.currUser = req.user;
  next();
});

app.use("/blogs", blogRouter);
app.use("/", userRouter);

//page not found error middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

//error middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () =>
  console.log(`Server is running on https://localhost:${port}`)
);
