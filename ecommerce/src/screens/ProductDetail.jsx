import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ProductDetail() {
	const location = useLocation();
	const { productData, userData } = location.state;

	useEffect(() => {
		console.log(userData.email);
	}, []);

	return (
		<div className="flex-col">
			<div className=" w-screen flex md:flex-row flex-col py-10">
				{/* image container */}
				<div className="w-full md:w-1/3 h-full flex items-center justify-center">
					<img src={require("../assests/images/product-img.jpg")} />
				</div>
				{/* title container */}
				<div className="w-full md:w-1/3 h-full flex flex-col items-start justify-center pt-16">
					<h1 className="text-2xl font-semibold px-4">{productData.title}</h1>
					<p className="px-4 py-4">Price: {productData.id}$</p>
					<p className="px-4">Seller Name: {productData.sellerName}</p>
				</div>
				{/* add to cart container */}
				<div className="w-full md:w-1/3 flex items-center justify-center">
					<div className="border-2 border-gray-400 w-96 flex flex-col my-4 mx-2 items-center justify-center rounded-xl">
						<button className="bg-yellow-500 w-64 h-8 my-3 rounded-xl hover:border-yellow-500 hover:bg-white hover:border-2">
							Add to Cart
						</button>
						<button className="bg-yellow-500 w-64 h-8 my-3 rounded-xl hover:border-yellow-500 hover:bg-white hover:border-2">
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<div className="px-4">
				<p>{productData.description}</p>
			</div>
		</div>
	);
}

export default ProductDetail;
