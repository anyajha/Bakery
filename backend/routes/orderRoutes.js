const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const Address= require("../models/Address");


router.get("/all", async (req, res) => {
 try {
   const orders = await Order.find().sort({ createdAt: -1 });
   res.json(orders);
 } catch (err) {
   res.status(500).json({ message: err.message });
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

// POST → create order

router.post("/", async (req, res) => {

  try {

    const { email, items, total, address, saveAddress } = req.body;

    // 1️⃣ Always save order

    const order = new Order({

      email,

      items,

      total,

      address

    });

    await order.save();

    // 2️⃣ Save address ONLY if checkbox checked

    if (saveAddress && address) {

      const existing = await Address.findOne({

        email,

        addressText: address

      });

      if (!existing) {

        await Address.create({

          email,

          addressText: address,

          label: "Home",

          isDefault: true

        });

      }

    }

    res.status(201).json(order);

  } catch (err) {

    res.status(500).json({ message: "Failed to save order" });

  }

});
 

// GET → orders by email

router.get("/:email", async (req, res) => {

  try {

    const orders = await Order.find({ email: req.params.email });

    res.json(orders);

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch orders" });

  }

});


router.get("/recent/:email", async (req, res) => {

  try {

    const { userId } = req.params;

    const fortyFiveMinutesAgo = new Date(

      Date.now() - 45 * 60 * 1000

    );

    const orders = await Order.find({

      userId,

      createdAt: { $gte: fortyFiveMinutesAgo }

    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch recent orders" });

  }

});
 

module.exports = router;
 
