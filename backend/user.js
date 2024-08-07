import prisma from "./db/db.config.js";

import PoolData from "pg";

export const signup = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email || !password) {
		return res.status(400).json({ msg: "All fields are required" });
	}

	try {
		const findUser = await prisma.users.findUnique({
			where: {
				email: email,
			},
		});

		if (findUser) {
			return res.status(400).json({ status: 400, msg: "User already exists" });
		}

		const newUser = await prisma.users.create({
			data: {
				email: email,
				password: password,
			},
		});
		return res
			.status(201)
			.json({ status: 201, msg: "New User Sign Up", data: newUser });
	} catch (err) {
		return res.status(500).json({ status: 500, msg: "Internal server error" });
	}
};

export const signin = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email || !password) {
		return res
			.status(400)
			.json({ status: 400, msg: "All fields are required" });
	}

	try {
		const validUser = await prisma.users.findFirst({
			where: {
				email: email,
				password: password,
			},
		});

		if (validUser) {
			return res
				.status(200)
				.json({ status: 200, msg: "User Sign In ", data: validUser });
		} else {
			return res.status(404).json({ status: 404, msg: "User not found" });
		}
	} catch (err) {
		return res.status(500).json({ status: 500, msg: "Internal server error" });
	}
};
