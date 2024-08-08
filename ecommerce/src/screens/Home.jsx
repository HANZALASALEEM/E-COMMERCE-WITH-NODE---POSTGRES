import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stateManager from "../context/manageStateContext";

function Home() {
	const context = useContext(stateManager);
	const navigate = useNavigate();
	const [productList, setProductList] = useState([]);
	const [user_id, setUser_id] = useState(0);
	const [cart_id, setCart_id] = useState(0);
	const [cartItemAmount, setCartItemAmount] = useState(0);

	useEffect(() => {
		if (context.userData && context.userData.id) {
			setUser_id(context.userData.id);
			setCart_id(context.userData.id - 1);
		}
	}, [context.userData]);

	const handleSellSomething = () => {
		navigate("/sell");
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch("http://localhost:8080/fetchProduct", {
					method: "GET",
				});

				if (response.status === 200) {
					const data = await response.json();
					setProductList(data.data);
				} else {
					console.error(
						"Failed to fetch products, status code:",
						response.status
					);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProduct();
	}, []);

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

	const handleProductDetailPage = (item) => {
		context.setProductData(item);
		navigate(
			"/productDetail" /*, {
			state: { productData: item, userData: context.userData },
		}*/
		);
	};
	const handleCartButton = (item) => {
		navigate("/cart");
	};

	return (
		<div>
			{/* navbar */}
			<div className="w-screen h-16 bg-slate-900 items-center justify-between flex flex-row py-2 px-4">
				{/* sell Button */}
				<div className=" h-full w-1/4 items-center justify-center flex">
					<button
						className="bg-yellow-500 w-64 h-full rounded-2xl hover:border-yellow-500 hover:bg-slate-900 hover:text-white hover:border-2 cursor-pointer"
						onClick={handleSellSomething}
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
			{productList.map((item) => (
				<div
					className="w-full my-3  px-16 flex items-center flex-col md:flex-row md:gap-4 border-2"
					key={item.id}
				>
					<button
						className="w-64 h-64"
						onClick={() => handleProductDetailPage(item)}
					>
						<img
							src={require("../assests/images/product-img.jpg")}
							className="w-full h-full"
						/>
					</button>
					<div className="w-full md:w-3/4 md:py-8 font-semibold">
						<h1 className="text-2xl">{item.title}</h1>
						<p className="text-sm">Brand: {item.brand}</p>
						<p className="text-sm">
							Price: <span className="text-green-400">{item.price} $</span>
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default Home;
