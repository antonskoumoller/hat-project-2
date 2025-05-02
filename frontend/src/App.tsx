import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";

function App() {
	// const LoginContext = React.createContext<????>({????})

	return (
		// {<LoginContext.Provider
		// 	value={{ isLoggedIn: false, setIsLoggedIn: () => {} }}
		// >}
		<BrowserRouter>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100vw",
					height: "100vh"
				}}
			>
				<Navbar />
				<div style={{ padding: "20px" }}>
					Body
					<Routes>
						{/* <Route path="/" element={<HomePage />} /> */}
						{/* <Route path="/product" element={<ProductPage />} /> */}
						{/* <Route path="/basket" element={<BasketPage />} /> */}
						{/* <Route path="/login" element={<LoginPage />} /> */}
						{/* <Route path="*" element={<HomePage />} /> */}
					</Routes>
				</div>
			</div>
		</BrowserRouter>
		// </LoginContext.Provider>
	);
}

export default App;
