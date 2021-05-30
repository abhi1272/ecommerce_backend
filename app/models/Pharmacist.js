const mongoose = require("mongoose");
      Schema = mongoose.Schema;

let pharmacistSchema = new Schema(
  {
    uuid:{
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
    class:[
        {type:String}
    ],
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    mobile_number: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pharmacist", pharmacistSchema);
