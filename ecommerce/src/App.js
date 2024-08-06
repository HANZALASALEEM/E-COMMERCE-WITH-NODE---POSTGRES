import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Sell from "./screens/Sell";
import ProductDetail from "./screens/ProductDetail";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignUp />} />
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/home" element={<Home />} />
				<Route path="/sell" element={<Sell />} />
				<Route path="/productDetail" element={<ProductDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
