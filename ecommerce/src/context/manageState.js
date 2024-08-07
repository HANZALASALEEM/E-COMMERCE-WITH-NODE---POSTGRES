import stateManager from "./manageStateContext";
import { useState } from "react";

const ManageState = (props) => {
	const [userData, setUserData] = useState({});
	const [productData, setProductData] = useState({});
	return (
		<stateManager.Provider
			value={{ userData, setUserData, productData, setProductData }}
		>
			{props.children}
		</stateManager.Provider>
	);
};

export default ManageState;
