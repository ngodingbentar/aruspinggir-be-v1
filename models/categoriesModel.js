const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Categories', categoriesSchema);