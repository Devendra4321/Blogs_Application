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
const blogRouter = express.Router();

//index route
blogRouter.get("/", renderIndexForm);

//new get route
blogRouter.get("/new", renderNewBlogForm);

//new post route
blogRouter.post("/", createBlogs);

//update get route
blogRouter.get("/:id/edit", renderUpdateBlogForm);

//update post route
blogRouter.put("/:id", updateBlog);

//show route
blogRouter.get("/:id", showBlog);

//delete route
blogRouter.delete("/:id", deleteBlog);

module.exports = blogRouter;
