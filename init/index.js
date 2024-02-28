const mongoose = require("mongoose");
const initData = require("./data.js");
const Blog = require("../models/blog.js");
//mongoose connection
main()
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blogDatabase");
}

const initDB = async () => {
  await Blog.insertMany(initData);
  console.log("data was initialized");
};

initDB();
