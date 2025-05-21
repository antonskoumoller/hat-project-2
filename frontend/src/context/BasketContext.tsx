import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback
} from "react";
import type { BasketItemProps } from "../components/basket/BasketItem";
import { HatItem } from "../components/ItemCard";
import { useLogin } from "./LoginContext";

type BasketContextType = {
	items: BasketItemProps[];
	totalPrice: number;
	refreshBasket: () => void;
	addItem: (hat: HatItem) => void;
	removeItem: (hat: HatItem) => void;
	clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<BasketItemProps[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const { isLoggedIn, user } = useLogin();

	const activeEmail = isLoggedIn && user?.email ? user.email : "guest";

	// Fetch basket from backend
	const refreshBasket = useCallback(() => {
		fetch(
			`http://localhost:3000/customers/${encodeURIComponent(activeEmail)}/basket`
		)
			.then((res) => res.json())
			.then((data) => setItems(data))
			.catch((err) => {
				console.error("Failed to fetch basket:", err);
				setItems([]);
			});
	}, [activeEmail]);

	useEffect(() => {
		refreshBasket();
	}, [refreshBasket]);

	useEffect(() => {
		const total = items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		setTotalPrice(total);
	}, [items]);

	// Add an item to the basket
	function addItem(hat: HatItem) {
		fetch(
			`http://localhost:3000/customers/${encodeURIComponent(activeEmail)}/basket/${hat.id}`,
			{ method: "POST" }
		)
			.then(() => refreshBasket())
			.catch((err) => console.error("Add item failed:", err));
	}
	// Remove an item from the basket
	function removeItem(hat: HatItem) {
		fetch(
			`http://localhost:3000/customers/${encodeURIComponent(activeEmail)}/basket/${hat.id}`,
			{ method: "PUT" } // decrement quantity
		)
			.then(() => refreshBasket())
			.catch((err) => console.error("Remove item failed:", err));
	}
	// Remove everything from the basket
	function clearBasket() {
		fetch(
			`http://localhost:3000/customers/${encodeURIComponent(activeEmail)}/basket`,
			{ method: "DELETE" }
		)
			.then(() => setItems([]))
			.catch((err) => console.error("Clear basket failed:", err));
	}

	return (
		<BasketContext.Provider
			value={{
				items,
				totalPrice,
				addItem,
				removeItem,
				clearBasket,
				refreshBasket
			}}
		>
			{children}
		</BasketContext.Provider>
	);
}

export function useBasket() {
	const context = useContext(BasketContext);
	if (!context)
		throw new Error("useBasket must be used within a BasketProvider");
	return context;
}
