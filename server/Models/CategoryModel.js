import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
