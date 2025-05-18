import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import BasketPage from "./pages/BasketPage";
import LoginPage from "./pages/LoginPage";
import { BasketProvider } from "./context/BasketContext";
import { LoginProvider } from "./context/LoginContext";

function App() {
	return (
		<LoginProvider>
			<BasketProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/product" element={<ProductPage />} />
						<Route path="/basket" element={<BasketPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</BrowserRouter>
			</BasketProvider>
		</LoginProvider>
	);
}

export default App;
