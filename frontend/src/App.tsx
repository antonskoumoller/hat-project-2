import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
	// const LoginContext = React.createContext<????>({????})

	return (
		// {<LoginContext.Provider
		// 	value={{ isLoggedIn: false, setIsLoggedIn: () => {} }}
		// >}
		<BrowserRouter>
			{/* <Navbar /> */}
			<Routes>
				{/* <Route path="/" element={<HomePage />} /> */}
				{/* <Route path="/product" element={<ProductPage />} /> */}
				{/* <Route path="/basket" element={<BasketPage />} /> */}
				{/* <Route path="/login" element={<LoginPage />} /> */}
				{/* <Route path="*" element={<HomePage />} /> */}
			</Routes>
		</BrowserRouter>
		// </LoginContext.Provider>
	);
}

export default App;
