import React, { createContext, useContext, useState, useEffect } from "react";
import type { BasketItemProps } from "../components/basket/BasketItem";
import { HatItem } from "../components/ItemCard";
import { useLogin } from "./LoginContext";

type BasketContextType = {
	items: BasketItemProps[];
	totalPrice: number;
	addItem: (hat: HatItem) => void;
	removeItem: (hat: HatItem) => void;
	clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<BasketItemProps[]>(() => {
		if (typeof window === "undefined") return [];
		const stored = localStorage.getItem("guest_basket");
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch {
				return [];
			}
		}
		return [];
	});

	const [totalPrice, setTotalPrice] = useState<number>(0);
	const { isLoggedIn, user } = useLogin();

	useEffect(() => {
		if (isLoggedIn && user?.email) {
			fetch(`http://localhost:3000/customers/${encodeURIComponent(user.email)}/basket`)
				.then((res) => res.json())
				.then((data) => setItems(data))
				.catch((err) => console.error(err));
		}
	}, [isLoggedIn, user?.email]);

	useEffect(() => {
		if (!isLoggedIn) {
			const stored = localStorage.getItem("guest_basket");
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					setItems(parsed);
				} catch (err) {
					console.error("Invalid basket in localStorage:", err);
				}
			}
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (!isLoggedIn) {
			localStorage.setItem("guest_basket", JSON.stringify(items));
		}
	}, [items, isLoggedIn]);

	useEffect(() => {
		if (isLoggedIn) {
			localStorage.removeItem("guest_basket");
		}
	}, [isLoggedIn]);

	useEffect(() => {
		const total = items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		setTotalPrice(total);
	}, [items]);
	// Add or increment item
	function addItem(hat: HatItem) {
		setItems((prev) => {
			const existing = prev.find((i) => i.id === hat.id);
			if (existing) {
				const updated = prev.map((i) =>
					i.id === hat.id ? { ...i, quantity: i.quantity + 1 } : i
				);

				if (isLoggedIn && user?.email) {
					fetch(
						`http://localhost:3000/customers/${encodeURIComponent(user.email)}/basket/${hat.id}`,
						{
							method: "POST"
						}
					).catch((err) =>
						console.error("Error incrementing basket item:", err)
					);
				}

				return updated;
			}
			//TODO: maybe this needs to be changed
			const newItem: BasketItemProps = {
				...hat,
				customer_id: isLoggedIn ? user!.email : "demo@mail.com",
				quantity: 1
			};

			if (isLoggedIn && user?.email) {
				fetch(
					`http://localhost:3000/customers/${encodeURIComponent(user.email)}/basket/${hat.id}`,
					{
						method: "POST"
					}
				).catch((err) =>
					console.error("Error adding new item to basket:", err)
				);
			}

			return [...prev, newItem];
		});
	}

	function removeItem(hat: HatItem) {
		const basketItem = items.find((i) => i.id === hat.id);
		if (!basketItem) return;

		const newQuantity = basketItem.quantity - 1;

		if (newQuantity === 0) {
			// Update local state
			setItems((prev) => prev.filter((i) => i.id !== hat.id));

			// If logged in, delete item from backend
			if (isLoggedIn && user?.email) {
				fetch(
					`http://localhost:3000/customers/${user.email}/basket/${hat.id}`,
					{
						method: "DELETE"
					}
				).catch((err) =>
					console.error("Error deleting from basket:", err)
				);
			}

			return;
		}

		// Decrease quantity locally
		setItems((prev) =>
			prev.map((i) =>
				i.id === hat.id ? { ...i, quantity: newQuantity } : i
			)
		);

		// Sync to backend if logged in
		if (isLoggedIn && user?.email) {
			fetch(
				`http://localhost:3000/customers/${encodeURIComponent(user.email)}/basket/${hat.id}`,
				{
					method: "PUT"
				}
			).catch((err) =>
				console.error("Error decrementing basket item:", err)
			);
		}
	}

	function clearBasket() {
		setItems([]);

		if (isLoggedIn && user?.email) {
			fetch(`http://localhost:3000/customers/${encodeURIComponent(user.email)}/basket`, {
				method: "DELETE"
			}).catch((err) => console.error("Error clearing basket:", err));
		}
	}

	return (
		<BasketContext.Provider
			value={{
				items,
				totalPrice,
				addItem,
				removeItem,
				clearBasket
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
