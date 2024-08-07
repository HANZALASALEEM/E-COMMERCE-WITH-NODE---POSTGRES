import prisma from "./db/db.config.js";

export const sellProduct = async (req, res) => {
	const { title, description, brand, sellerName, price } = req.body;
	console.log(req.body);
	if (!title || !description || !brand || !sellerName || !price) {
		return res
			.status(400)
			.json({ status: 400, msg: "All fields are required" });
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
		return res.status(201).json({
			status: 201,
			msg: "New Product added in DB",
			data: newProduct,
		});
	} catch (err) {
		return res.status(500).json({ status: 500, msg: "Internal server error" });
	}
};

export const fetchProducts = async (req, res) => {
	try {
		const ProductList = await prisma.products.findMany({});

		if (ProductList) {
			return res.status(200).json({ status: 200, data: ProductList });
		} else {
			return res.status(404).json({ status: 404, msg: "Products not found" });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 500, msg: "Internal server error" });
	}
};
