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

		const productAlreadyExist = await prisma.cartItem.findFirst({
			where: {
				product_id: Number(product_id),
				cart: {
					user_id: Number(user_id),
				},
			},
		});

		if (productAlreadyExist) {
			return res
				.status(400)
				.json({ status: 400, msg: "Product already exists in cart" });
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

export const fetchCartItems = async (req, res) => {
	const { cart_id } = req.body;
	try {
		const cart = await prisma.cart.findUnique({
			where: {
				id: cart_id,
			},
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		if (cart) {
			return res.status(200).json({ status: 200, data: cart });
		} else {
			return res
				.status(404)
				.json({ status: 404, msg: "Items not founded in cart" });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 500, msg: "Internal server error" });
	}
};

export const deleteCartItem = async (req, res) => {
	const { item_id } = req.body;
	try {
		await prisma.cartItem.delete({
			where: {
				id: item_id,
			},
		});
		return res
			.status(200)
			.json({ status: 200, msg: "item deleted successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: 500, msg: "Internal server error" });
	}
};
