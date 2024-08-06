export const signup = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		res.send(`receiving data ${email} and ${password}`);
	} catch (error) {
		next(error);
	}
};
