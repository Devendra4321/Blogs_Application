const Blog = require("../models/blog.js");

//index
module.exports.renderIndexForm = async (req, res) => {
  let blogs = await Blog.find({}).populate("owner");
  res.render("./blogs/index.ejs", { blogs });
};

//new get
module.exports.renderNewBlogForm = (req, res) => {
  res.render("./blogs/new.ejs");
};

//new post
module.exports.createBlogs = async (req, res) => {
  let { title, image, description } = req.body;
  let created_date = new Date().toLocaleDateString();
  let newBlog = new Blog({ title, created_date, image, description });
  newBlog.owner = req.user._id;
  await newBlog.save();
  req.flash("success", "New blog added!");
  res.redirect("/blogs");
};

//show
module.exports.showBlog = async (req, res) => {
  let { id } = req.params;
  let showBlog = await Blog.findById(id).populate("owner");
  if (!showBlog) {
    req.flash("error", "Blog you requested for does not exist!");
    res.redirect("/blogs");
  }
  res.render("./blogs/show.ejs", { showBlog });
};

//update get
module.exports.renderUpdateBlogForm = async (req, res) => {
  let { id } = req.params;
  let updateBlog = await Blog.findById(id);
  if (!updateBlog) {
    req.flash("error", "Blog you requested for does not exist!");
    res.redirect("/blogs");
  }
  res.render("./blogs/edit.ejs", { updateBlog });
};

//update post
module.exports.updateBlog = async (req, res) => {
  let { id } = req.params;
  let { title, image, description } = req.body;
  let updated_date = new Date().toLocaleDateString();
  let updated_time = new Date().toLocaleTimeString();
  let updated = updated_date + " " + updated_time;
  await Blog.findByIdAndUpdate(
    { _id: id },
    {
      title,
      description,
      image,
      updated,
    }
  );
  req.flash("success", "Blog updated!");
  res.redirect("/blogs");
};

//delete
module.exports.deleteBlog = async (req, res) => {
  let { id } = req.params;
  let deletedBlog = await Blog.findByIdAndDelete(id);
  req.flash("success", "Blog deleted!");
  res.redirect("/blogs");
};
