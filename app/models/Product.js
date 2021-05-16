const mongoose = require("mongoose");
      Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    company: {
      type: String,
      require: true,
      trim: true,
    },
    composition:[
        {type:String}
    ],
    batchNo: {
      type: String,
      trim: true,
      unique: true,
    },
    mrp: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
    },
    Rate: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    category: [{
      name: { type: String },
      uuid: { type: String },
    }],
    addedBy: {
      name: {
        type: String,
      },
      uuid: {
        type: String,
      },
    },
    similarProducts: [
      {
        name: { type: String },
        image: { type: String },
        uuid: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
