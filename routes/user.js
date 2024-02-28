const express = require("express");
const {
  renderSignupForm,
  renderLoginForm,
  signup,
  login,
  logout,
} = require("../controllers/user");
const userRouter = express.Router();
const passport = require("passport");

//signup get
userRouter.get("/signup", renderSignupForm);

//signup post
userRouter.post("/signup", signup);

//login get
userRouter.get("/login", renderLoginForm);

//login post
userRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);

//logout
userRouter.get("/logout", logout);

module.exports = userRouter;
