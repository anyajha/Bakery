const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  email: String,

  items: Array,

  total: Number,

  address: {

    type: String,

    required: true,

  },

  createdAt: {

    type: Date,

    default: Date.now,

  },

});

module.exports = mongoose.model("Order", orderSchema);
 
