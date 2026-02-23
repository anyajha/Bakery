const express = require("express");

const router = express.Router();

const Address = require("../models/Address");

// ➕ Add address

router.post("/add", async (req, res) => {

  try {

    const {email, addressText, label, isDefault} = req.body;

    if (isDefault) {

      await Address.updateMany(

        { email },

        { $set: { isDefault: false } }

      );

    }

    const address = new Address({

      email,

      addressText,

      label,

      isDefault,

    });

    await address.save();

    res.status(201).json(address);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

// 📥 Get all addresses of user

router.get("/:email", async (req, res) => {

  try {

    const addresses = await Address.find({ email: req.params.email });

    res.json(addresses);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

// ❌ Delete address

router.delete("/:id", async (req, res) => {

  try {

    await Address.findByIdAndDelete(req.params.id);

    res.json({ message: "Address deleted" });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

 

module.exports = router;
 
