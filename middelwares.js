const Blog = require("./models/blog.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  //for authorization in server side
  let blog = await Blog.findById(id);
  if (!blog.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of listing!");
    return res.redirect(`/blogs/${id}`);
  }
  next();
};
