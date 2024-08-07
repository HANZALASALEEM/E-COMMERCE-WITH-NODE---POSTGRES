import prisma from "./db/db.config.js";

export const addToCart = async (req, res) => {
	const { user_id, product_id } = req.body;

	try {
		// Check if the user exists
		const user = await prisma.users.findUnique({
			where: { id: Number(user_id) },
		});

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		// Check if the product exists
		const product = await prisma.products.findUnique({
			where: { id: Number(product_id) },
		});

		if (!product) {
			return res.status(404).json({ msg: "Product not found" });
		}

		// Check if the user already has a cart
		let userCart = await prisma.cart.findUnique({
			where: { user_id: Number(user_id) },
			include: { items: true },
		});

		// If no cart exists, create one
		if (!userCart) {
			userCart = await prisma.cart.create({
				data: {
					user: {
						connect: { id: Number(user_id) },
					},
					items: {
						create: {
							product: {
								connect: { id: Number(product_id) },
							},
						},
					},
				},
				include: { items: true },
			});
		} else {
			// Add product to the existing cart
			userCart = await prisma.cart.update({
				where: { id: userCart.id },
				data: {
					items: {
						create: {
							product: {
								connect: { id: Number(product_id) },
							},
						},
					},
				},
				include: { items: true },
			});
		}

		return res.status(201).json({
			status: 201,
			data: userCart,
			msg: "Product added to cart",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 500, msg: err.message });
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
