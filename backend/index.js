// const express = require("express");
import express from "express";
import authRouter from "./routes/auth.route.js";
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";
import cors from "cors";
import { signin, signup } from "./user.js";
import { fetchProducts, sellProduct } from "./product.js";
import { addToCart } from "./cart.js";
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/sellProduct", sellProduct);
app.use("/fetchProduct", fetchProducts);
app.use("/addToCart", addToCart);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
