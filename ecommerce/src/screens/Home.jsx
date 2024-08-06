import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
	const navigate = useNavigate();
	const [productList, setProductList] = useState([]);
	const handleSellSomething = () => {
		navigate("/sell");
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch("http://localhost:8080/fetchProduct", {
					method: "GET",
				});
				// const data = await response.json();
				// setProductList(data.data);
				// console.log("Fetched products:", productList);
				if (response.status === 200) {
					const data = await response.json();
					// Assuming the data is an array of products
					setProductList(data.data);
					console.log("Fetched products:", productList);
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

	const handleProductDetailPage = (item) => {
		console.log(item);
		navigate("/productDetail", { state: item });
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
					<img
						className="w-8 h-8"
						src={require("../assests/images/grocery-store.png")}
					/>
				</div>
			</div>
			{productList.map((item) => (
				<div className="w-full my-3  px-16 flex items-center flex-col md:flex-row md:gap-4 border-2">
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
						<a href="/productDetail" className="text-2xl">
							{item.title}
						</a>
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
