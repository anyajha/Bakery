const express = require("express");

const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");

const { verifyAdmin } = require("../middleware/auth");


 
// ✅ Get ALL orders (for admin dashboard)
router.get("/all", async (req, res) => {
 try {
   const orders = await Order.find().sort({ createdAt: -1 });
   res.json(orders);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});


//by id

router.get("/:id", async (req, res) => {

  try {
const product = await Product.findById(req.params.id);
if (!product) {
 return res.status(404).json({ message: "Product not found" });
}
res.json(product);

  } catch (err) {

    res.status(500).json({ msg: err.message });

  }

});



// ✅ Get orders by email (user)
router.get("/:email", async (req, res) => {
 try {
   const orders = await Order.find({ email: req.params.email });
   res.json(orders);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});


// ✅ GET all products (for customers)
router.get("/", async (req, res) => {
 try {
   const products = (await Product.find());
   res.json(products);
 } catch (err) {
   res.status(500).json({ msg: err.message });
 }
});

// Admin → create product

router.post("/", verifyAdmin, async (req, res) => {

  try {

    const product = new Product(req.body);

    await product.save();

    res.json(product);

  } catch (err) {

    res.status(500).json({ msg: err.message });

  }

});


// GET products by category

router.get("/category/:category", async (req, res) => {

  try {

    const category = req.params.category;

    const products = await Product.find({ category });

    res.json(products);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});
 

 

// Admin → delete product

router.delete("/:id", verifyAdmin, async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });

  } catch (err) {

    res.status(500).json({ msg: err.message });

  }

});

router.put("/:id", async (req, res) => {

  try {

    const updated = await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    if (!updated) {

      return res.status(404).json({ message: "Product not found" });

    }

    res.json(updated);

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: err.message });

  }

});


 
 



module.exports = router; // ✅ must be here
 
