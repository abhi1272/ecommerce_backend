const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
Schema = mongoose.Schema;

let medicineSchema = new Schema(
  {
    uuid:{
      type: String,
      default:uuidv4(),
      required:true
    },
    medicine_name: {
      type: String,
      require: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      require: true,
      trim: true,
    },
    composition: [{ type: String }],
    MRP: {
      type: Number,
      require: true,
    },
    best_price: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      trim:true
    },
    category: {
      type: String
    },
    benefits:{
      type:String,
      trim:true
    },
    pharmacist: [
      {
        type: Object,
      },
    ],
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

module.exports = mongoose.model("Medicine", medicineSchema);
