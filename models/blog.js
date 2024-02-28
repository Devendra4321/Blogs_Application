const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  created_date: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  updated: {
    date: String,
    time: String,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
