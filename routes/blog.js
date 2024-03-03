const express = require("express");
const {
  renderIndexForm,
  renderNewBlogForm,
  createBlogs,
  renderUpdateBlogForm,
  updateBlog,
  showBlog,
  deleteBlog,
} = require("../controllers/blog");
const { isLoggedIn, isOwner } = require("../middelwares");
const blogRouter = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Blog = require("../models/blog.js");

//index route
blogRouter.get("/", isLoggedIn, wrapAsync(renderIndexForm));

//new get route
blogRouter.get("/new", renderNewBlogForm);

//new post route
blogRouter.post("/", wrapAsync(createBlogs));

//update get route
blogRouter.get("/:id/edit", isOwner, wrapAsync(renderUpdateBlogForm));

//update post route
blogRouter.put("/:id", wrapAsync(updateBlog));

//show route
blogRouter.get("/:id", wrapAsync(showBlog));

//delete route
blogRouter.delete("/:id", isOwner, wrapAsync(deleteBlog));

module.exports = blogRouter;
