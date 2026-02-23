const sendEmail= require("../utils/sendEmail");


const express = require("express");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

/**

 * @route   POST /api/auth/register

 * @desc    Register user (use once to create admin)

 */



router.post("/register", async (req, res) => {
  console.log("REGISTER BODY:", req.body);

  try {

    const { email, password, role, name } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {

      return res.status(400).json({ msg: "User already exists" });

    }

    const user = new User({

      name,

      email,

      password,

      role: role || "customer",

    });

    await user.save();
try {

  await sendEmail({

    to: user.email,

    subject: "Welcome to CakeSquare 🍰",

    html: `
<h2>Welcome ${user.name}!</h2>
<p>Your account has been created successfully.</p>

    `,

  });

} catch (mailErr) {

  console.error("EMAIL FAILED:", mailErr.message);

}

res.json({ msg: "Registered successfully" });
 
  } catch (err) {

    console.error(err);

    res.status(500).json({ msg: err.message });

  }

});
 





/**

 * @route   POST /api/auth/login

 * @desc    Login user and return JWT

 */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {

      return res.status(401).json({ msg: "Invalid credentials" });

    }

    const token = jwt.sign(

      { id: user._id, role: user.role, email: user.email },

      process.env.JWT_SECRET,

      { expiresIn: "3d" }

    );

    res.json({

      token,

      role: user.role,

      email: user.email,

    });

  } catch (err) {

    res.status(500).json({ msg: err.message });

  }

});

module.exports = router;
 
