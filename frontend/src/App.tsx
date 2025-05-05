import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import BasketPage from "./pages/BasketPage";
import LoginPage from "./pages/LoginPage";


function App() {
	// const LoginContext = React.createContext<????>({????})

	const testHats = [
		{
			id: 1,
			name: "Taco Hat",
			img: "/images/taco-hat.png",
			description: "Beautiful taco hat for parties and stuff",
			fullDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			category: "Fun",
			popular: true,
			price: 500,
			brand: "Gucci"
		},
		{
			id: 2,
			name: "Captain",
			img: "/images/Kaptajn.jpg",
			description: "Traditional headpiece for the born sailor",
			fullDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			category: "Outdoor",
			popular: true,
			price: 500,
			brand: "Gucci"
		},
		{
			id: 3,
			name: "Strawberry",
			img: "/images/Strawberry.png",
			description: "Cute headpiece with a summer feeling",
			fullDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			category: "Kids",
			popular: true,
			price: 500,
			brand: "Gucci"
		},
		{
			id: 4,
			name: "Taco Hat",
			img: "/images/taco-hat.png",
			description: "Beautiful taco hat for parties and stuff",
			fullDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			category: "Fun",
			popular: true,
			price: 500,
			brand: "Gucci"
		},
		{
			id: 5,
			name: "Taco Hat",
			img: "/images/taco-hat.png",
			description: "Beautiful taco hat for parties and stuff",
			fullDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			category: "Fun",
			popular: true,
			price: 500,
			brand: "Gucci"
		},
		{
			id: 6,
			name: "Taco Hat",
			img: "/images/taco-hat.png",
			description: "Beautiful taco hat for parties and stuff",
			fullDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			category: "Fun",
			popular: true,
			price: 500,
			brand: "Gucci"
		}
	];

	return (
		// {<LoginContext.Provider
		// 	value={{ isLoggedIn: false, setIsLoggedIn: () => {} }}
		// >}
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/product"
					element={<ProductPage hats={testHats} />}
				/>
				<Route path="/basket" 
					element={<BasketPage />} />
				<Route path="/login" element={<LoginPage />} />
				{/* <Route path="*" element={<HomePage />} /> */}
			</Routes>
		</BrowserRouter>
		// </LoginContext.Provider>
	);
}

export default App;
