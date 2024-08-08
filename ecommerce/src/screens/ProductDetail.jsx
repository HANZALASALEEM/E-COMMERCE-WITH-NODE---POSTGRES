import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProductDetail() {
	const navigate = useNavigate();
	const location = useLocation();
	const { productData } = location.state;
	const [user_id, setUser_id] = useState(
		parseInt(sessionStorage.getItem("user_id"))
	);
	const [cart_id, setCart_id] = useState(0);
	const [product_id, setProduct_id] = useState(
		parseInt(sessionStorage.getItem("product_id"))
	);
	const [cartItemAmount, setCartItemAmount] = useState(0);
	useEffect(() => {
		setCart_id(user_id - 1);
	}, []);

	const handleAddToCart = async (e) => {
		e.preventDefault();
		if (user_id) {
			try {
				const response = await fetch("http://localhost:8080/addToCart", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ user_id, product_id }),
				});

				if (response.status === 201) {
					const data = await response.json();
					fetchCartItems();
					alert("Added in Cart");
				} else if (response.status === 400) {
					alert("Product already exists in cart");
				} else {
					console.log(" Error Status: ", response.status);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		} else {
			navigate("/signIn");
		}
	};

	const fetchCartItems = useCallback(async () => {
		if (cart_id) {
			try {
				const response = await fetch("http://localhost:8080/fetchCartItems", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ cart_id }),
				});
				if (response.status === 200) {
					const data = await response.json();
					setCartItemAmount(data.data.items.length);
				} else {
					console.error(
						"Failed to fetch cart items, status code:",
						response.status
					);
				}
			} catch (error) {
				console.error("Error fetching cart items:", error);
			}
		}
	}, [cart_id]);

	useEffect(() => {
		fetchCartItems();
	}, [fetchCartItems]);

	const handleCartButton = () => {
		navigate("/cart");
	};

	return (
		<div className="flex-col">
			{/* navbar */}
			<div className="w-screen h-16 bg-slate-900 items-center justify-between flex flex-row py-2 px-4">
				{/* sell Button */}
				<div className=" h-full w-1/4 items-center justify-center flex">
					<button
						className="bg-yellow-500 w-64 h-full rounded-2xl hover:border-yellow-500 hover:bg-slate-900 hover:text-white hover:border-2 cursor-pointer"
						// onClick={handleSellSomething}
					>
						Sell Something
					</button>
				</div>
				{/* search bar */}
				<div className=" h-full w-2/4 items-center justify-center flex">
					<div className="w-full md:w-3/4 h-full flex justify-center ">
						<div className="w-3/4 rounded-tl-2xl rounded-bl-2xl border-2 border-gray-400 pl-3 bg-white">
							<input className="w-full h-full" />
						</div>
						<div className="bg-yellow-500 w-16 flex items-center justify-center rounded-tr-2xl rounded-br-2xl">
							<img
								className="w-8 h-8"
								src={require("../assests/images/search.png")}
							/>
						</div>
					</div>
				</div>
				{/* cart Icon */}
				<div className="h-full w-1/4 flex items-center justify-center">
					<button
						onClick={handleCartButton}
						className="h-full w-full flex flex-col items-center justify-center"
					>
						<div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
							<p>{cartItemAmount}</p>
						</div>
						<img
							className="w-8 h-8"
							src={require("../assests/images/grocery-store.png")}
						/>
					</button>
				</div>
			</div>
			<div className=" w-screen flex md:flex-row flex-col py-10">
				{/* image container */}
				<div className="w-full md:w-1/3 h-full flex items-center justify-center">
					<img src={require("../assests/images/product-img.jpg")} />
				</div>
				{/* title container */}
				<div className="w-full md:w-1/3 h-full flex flex-col items-start justify-center pt-16">
					<h1 className="text-2xl font-semibold px-4">{productData.title}</h1>
					<p className="px-4 py-4">Price: {productData.price}$</p>
					<p className="px-4">Seller Name: {productData.sellerName}</p>
				</div>
				{/* add to cart container */}
				<div className="w-full md:w-1/3 flex items-center justify-center">
					<div className="border-2 border-gray-400 w-96 flex flex-col my-4 mx-2 items-center justify-center rounded-xl">
						<button
							className="bg-yellow-500 w-64 h-8 my-3 rounded-xl hover:border-yellow-500 hover:bg-white hover:border-2"
							onClick={handleAddToCart}
						>
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
