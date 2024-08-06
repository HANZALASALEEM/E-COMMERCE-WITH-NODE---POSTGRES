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

export const signup = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email || !password) {
		return res.status(400).send("All fields are required!");
	}

	try {
		const findUser = await prisma.users.findUnique({
			where: {
				email: email,
			},
		});

		if (findUser) {
			return res.status(400).send("Email already exists. try another one");
		}

		const newUser = await prisma.users.create({
			data: {
				email: email,
				password: password,
			},
		});
		return res.status(201).send("New User Sign Up");
	} catch (err) {
		console.error(err);
		res.status(500).send("Some error has occurred");
	}
};

export const signin = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email || !password) {
		return res.status(400).send("All fields are required!");
	}

	try {
		const validUser = await prisma.users.findFirst({
			where: {
				email: email,
				password: password,
			},
		});

		if (validUser) {
			return res.status(200).send("User Sign In ");
		} else {
			return res.status(404).send("User not found");
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Some error has occurred");
	}
};
