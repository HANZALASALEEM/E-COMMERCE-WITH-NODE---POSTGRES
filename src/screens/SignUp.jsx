import React from "react";

function SignUp() {
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

					<form className="flex flex-col">
						<label className="text-sm font-semibold py-1">
							Email or Mobile Number
						</label>
						<input type="email" className="rounded-sm border-2" />
						<label className="text-sm font-semibold py-1">Password</label>
						<input type="password" className="rounded-sm border-2" />
						<button className="bg-yellow-500 my-2 text-sm py-1 rounded-sm">
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
			</div>
		</div>
	);
}

export default SignUp;
