const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const cors=require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors

app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ ROUTES — must export a router

const authRoutes = require("./routes/authRoutes");

const productRoutes = require("./routes/productRoutes");

const orderRoutes = require("./routes/orderRoutes");

const addressRoutes=require("./routes/addressRoutes");

// ✅ Use only routers here

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/addresses/", addressRoutes);

mongoose

  .connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB connected"));

app.listen(5000, () => console.log("Server running on 5000"));
 
