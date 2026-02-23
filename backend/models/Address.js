const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(

  {

    email: {

      type: String,

      required: true,

      index: true, // fast lookup

    },

    addressText: {

      type: String,

      required: true,

    },

    label: {

      type: String, // Home / Office etc

      default: "Home",

    },

    isDefault: {

      type: Boolean,

      default: false,

    },

  },

  { timestamps: true }

);

module.exports = mongoose.model("Address", addressSchema);
 
