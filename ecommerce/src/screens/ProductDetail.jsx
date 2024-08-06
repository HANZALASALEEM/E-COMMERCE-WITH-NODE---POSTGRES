import React from "react";
import { useLocation } from "react-router-dom";
function ProductDetail() {
	const location = useLocation();
	const { state: product } = location;
	return (
		<div className="bg-red-100 w-screen h-screen flex flex-row">
			{/* image container */}
			<div className="w-1/3 h-full flex items-center justify-center">
				<img src={require("../assests/images/product-img.jpg")} />
			</div>
			{/* title container */}
			<div className="w-1/3 h-full flex flex-col items-start justify-center">
				<h1 className="text-2xl font-semibold px-4">{product.title}</h1>
				<p className="px-4">Price: {product.price}$</p>
				<p className="px-4">{product.description}</p>
			</div>
			{/* add to cart container */}
			<div></div>
		</div>
	);
}

export default ProductDetail;
