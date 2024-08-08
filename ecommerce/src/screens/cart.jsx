import React, { useContext, useEffect, useState } from "react";
import stateManager from "../context/manageStateContext";

function Cart() {
	const context = useContext(stateManager);
	const [user_id, setUser_id] = useState(0);
	const [cart_id, setCart_id] = useState(0);
	const [cartItemList, setCartItemList] = useState([]);
	useEffect(() => {
		if (context.userData && context.userData.id) {
			setUser_id(context.userData.id);
			setCart_id(context.userData.id - 1);
			console.log(context.userData.id);
		}
	}, [context.userData]);

	useEffect(() => {
		if (user_id) {
			fetchCartItems();
		}
	}, [user_id]);

	const fetchCartItems = async () => {
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
				setCartItemList(data.data.items);
				console.log("Fetched cart items:", cartItemList);
			} else {
				console.error(
					"Failed to fetch cart items, status code:",
					response.status
				);
			}
		} catch (error) {
			console.error("Error fetching cart items:", error);
		}
	};

	const handleDeleteItem = async (item) => {
		const item_id = parseInt(item.id);
		try {
			await fetch("http://localhost:8080/deleteCartItems", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ item_id }),
			});
		} catch (error) {
			console.error("Error fetching cart items:", error);
		}
	};

	return (
		<div>
			{/* navbar */}
			<div className="w-screen h-16 bg-slate-900 items-center justify-between flex flex-row py-2 px-4">
				{/* sell Button */}
				<div className=" h-full w-1/4 items-center justify-center flex"></div>
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
				<div className="h-full w-1/4 flex items-center justify-center"></div>
			</div>
			{cartItemList.map((item) => (
				<div
					className="w-full my-3  px-16 flex items-center flex-col md:flex-row md:gap-4 border-2"
					key={item.product.id}
				>
					<button
						className="w-64 h-64"
						// onClick={() => handleProductDetailPage(item)}
					>
						<img
							src={require("../assests/images/product-img.jpg")}
							className="w-full h-full"
						/>
					</button>
					<div className="w-full md:w-3/4 md:py-8 font-semibold">
						<a href="/productDetail" className="text-2xl">
							{item.product.title}
						</a>
						<p className="text-sm">Brand: {item.product.brand}</p>
						<p className="text-sm">
							Price:{" "}
							<span className="text-green-400">{item.product.price} $</span>
						</p>
					</div>
					<button className="my-8" onClick={() => handleDeleteItem(item)}>
						<img
							src={require("../assests/images/trash.png")}
							className="w-8 h-8"
						/>
					</button>
				</div>
			))}
		</div>
	);
}

export default Cart;
