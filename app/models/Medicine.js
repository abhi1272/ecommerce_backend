const mongoose = require("mongoose");
      Schema = mongoose.Schema;

let medicineSchema = new Schema(
  {
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
    composition:[
        {type:String}
    ],
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
    },
    category: [{
      name: { type: String },
      uuid: { type: String },
    }],
    pharmacist: {
        type: Object
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

module.exports = mongoose.model("Medicine", medicineSchema);
