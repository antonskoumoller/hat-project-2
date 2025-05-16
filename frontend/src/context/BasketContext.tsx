import React, { createContext, useContext, useState, useEffect } from "react";
import type { BasketItemProps } from "../components/basket/BasketItem";
import { HatItem } from "../components/ItemCard";
import { useLogin } from "./LoginContext";

type BasketContextType = {
	items: BasketItemProps[];
	totalPrice: number;
	addItem: (hat: HatItem) => void;
	updateQuantity: (productId: number, newQty: number) => void;
	removeItem: (productId: number) => void;
	clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<BasketItemProps[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const { isLoggedIn, user } = useLogin();

	useEffect(() => {
		if (isLoggedIn && user?.id) {
			fetch(`http://localhost:3000/customers/${user.id}/basket`)
				.then((res) => res.json())
				.then((data) => setItems(data))
				.catch((err) => console.error(err));
		}
	}, [isLoggedIn, user?.id]);

	useEffect(() => {
		const total = items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		setTotalPrice(total);
	}, [items]);

	async function incrementHatInBasket(hat: HatItem) {
		try {
			const res = await fetch(
				`http://localhost:3000/customers/${user?.id}/basket/${hat.id}`,
				{
					method: "POST"
				}
			);
			if (!res.ok) {
				throw new Error("Failed to add hat to basket");
			}
			const result = await res.text();
			console.log(result);
		} catch (err) {
			console.error("Error adding hat to basket: ", err);
		}
	}

	function addItem(hat: HatItem) {
		setItems((prev) => {
			if (isLoggedIn) incrementHatInBasket(hat);
			// Sync with DB if user is logged in
			// TODO: Wrap in try catch to do it safely

			const existing = prev.find((i) => i.id === hat.id);
			if (existing) {
				const updated = prev.map((i) =>
					i.id === hat.id ? { ...i, quantity: i.quantity + 1 } : i
				);

				return updated;
			}

			const newItem: BasketItemProps = {
				...hat,
				//If logged in is true I KNOW there is a user from the LoginContextType. Therefore I can user!
				customer_id: isLoggedIn ? user!.id : 0,
				quantity: 1
			};

			return [...prev, newItem];
		});
	}

	function updateQuantity(productId: number, newQty: number) {
		setItems((prev) =>
			prev.map((i) =>
				i.id === productId ? { ...i, quantity: newQty } : i
			)
		);
		// if logged in do same for db
	}

	function removeItem(productId: number) {
		setItems((prev) => prev.filter((i) => i.id !== productId));
		// if logged in do same for db
	}

	function clearBasket() {
		setItems([]);
		// Delete database basket for logged in user
	}

	return (
		<BasketContext.Provider
			value={{
				items,
				totalPrice,
				addItem,
				updateQuantity,
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
