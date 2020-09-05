const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    images: { type: Array },
  });

  module.exports = mongoose.model("images", imageSchema);
