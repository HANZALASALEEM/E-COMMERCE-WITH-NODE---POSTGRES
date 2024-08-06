import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signUpUser = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8080/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.status === 400) {
				alert("User already exist");
			} else if (response.status === 201) {
				navigate("/home");
				const data = await response.json();
				console.log(data);
			} else {
				console.error("Signup failed");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSignIn = () => {
		navigate("/signIn");
	};

	return (
		<div className="w-screen h-screen">
			<div className="w-3/4 h-3/4 mx-auto lg:w-1/3">
				{/* logo */}
				<div className="w-64 h-16 mx-auto">
					<img
						src={require("../assests/images/amazon-logo.png")}
						className="w-1/2 mx-auto py-4"
						alt="Logo"
					/>
				</div>
				{/* container */}
				<div className="py-6 px-4 border-2 border-gray-300 rounded-xl">
					<h1 className="text-2xl mb-2 font-semibold">Sign Up</h1>

					<form
						className="flex flex-col"
						// action="http://localhost:8080/signup"
						// method="POST"
						onSubmit={signUpUser}
					>
						<label className="text-sm font-semibold py-1">Email</label>
						<input
							type="email"
							name="email"
							className="rounded-sm border-2"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label className="text-sm font-semibold py-1">Password</label>
						<input
							type="password"
							name="password"
							className="rounded-sm border-2"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className="bg-yellow-500 my-2 text-sm py-1 rounded-sm"
							type="submit"
							// onSubmit={signUpUser}
						>
							Continue
						</button>
						<p className="text-sm mt-4">
							By continuing, you agree to Amazon's{" "}
							<span className="underline text-blue-700 cursor-pointer">
								Conditions of use
							</span>{" "}
							and{" "}
							<span className="underline text-blue-700 cursor-pointer">
								Privacy Notice
							</span>
							.
						</p>
					</form>
				</div>
				{/* line Saperator */}
				<div className=" w-full my-3 flex flex-row items-center justify-between">
					<div className="w-1/4 h-0.5 bg-gray-400 rounded-xl"></div>
					<div className="w-2/4">
						<p className="text-sm text-center">Already have an account</p>
					</div>
					<div className="w-1/4 h-0.5 bg-gray-400 rounded-xl"></div>
				</div>
				{/* Sign In Button */}
				<div className="w-full">
					<button
						className="bg-white border-gray-400 border-2 rounded-xl my-2 text-sm py-1 rounded-sm w-full"
						onClick={handleSignIn}
					>
						Sign In
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
