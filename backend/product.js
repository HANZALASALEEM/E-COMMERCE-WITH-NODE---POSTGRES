import prisma from "./db/db.config.js";

import PoolData from "pg";
const { Pool } = PoolData;
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "e_commerce",
	password: "password",
	port: 5432,
});

export const sellProduct = async (req, res) => {
	const { title, description, brand, sellerName, price } = req.body;
	console.log(req.body);
	if (!title || !description || !brand || !sellerName || !price) {
		return res.status(400).send("All fields are required!");
	}

	try {
		const newProduct = await prisma.products.create({
			data: {
				title: title,
				description: description,
				brand: brand,
				sellerName: sellerName,
				price: parseInt(price),
			},
		});
		return res.status(201).send("New User Sign Up");
	} catch (err) {
		console.error(err);
		res.status(500).send("Some error has occurred");
	}
};

export const fetchProducts = async (req, res) => {
	try {
		const ProductList = await prisma.products.findMany({});

		if (ProductList) {
			return res.json({ status: 200, data: ProductList });
		} else {
			return res.status(404).send("Product List not found");
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Some error has occurred");
	}
};
