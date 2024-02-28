const User = require("../models/user");

//signup get
module.exports.renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs");
};

//signup post
module.exports.signup = async (req, res) => {
  let { email, username, password } = req.body;
  let newUser = new User({ email, username });
  let registerUser = await User.register(newUser, password);
  req.flash("success", "Welcome to Blog's system");
  res.redirect("/blogs");
};

//login get
module.exports.renderLoginForm = (req, res) => {
  res.render("./users/login.ejs");
};

//login post
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to Blog's!");
  //for post login
  // let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect("/blogs");
};

//logout
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/blogs");
  });
};
