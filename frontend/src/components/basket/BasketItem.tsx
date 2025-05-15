import React, { useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";

export type BasketItemProps = {
	customer_id: number;
	product_id: number;
	quantity: number;
	id: number;
	name: string;
	img: string;
	description: string;
	fullDescription: string;
	category: string;
	popular: number;
	price: number;
	brand: string;
};

type Props = BasketItemProps & {
	onDelete: (productId: number) => void;
	onQuantityChange: (productId: number, newQuantity: number) => void;
};

function Counter({
	value,
	onIncrement,
	onDecrement
}: {
	value: number;
	onIncrement: () => void;
	onDecrement: () => void;
}) {
	return (
		<div className="flex items-center">
			<button onClick={onIncrement}>
				<FaRegSquarePlus className="text-teal-500 w-6 h-6 hover:text-teal-200" />
			</button>
			<span className="p-2 text-2xl font-bold">{value}</span>

			<button onClick={onDecrement}>
				<FaRegSquareMinus className="text-amber-600 w-6 h-6 hover:text-amber-300" />
			</button>
		</div>
	);
}

export default function BasketItem({
	onDelete,
	onQuantityChange,
	...basketItem
}: Props) {
	const [quantity, setQuantity] = useState(basketItem.quantity);

	async function incrementHatInBasket() {
		try {
			const res = await fetch(
				`http://localhost:3000/customers/${basketItem.customer_id}/basket/${basketItem.id}`,
				{
					method: "POST"
				}
			);
			if (!res.ok) {
				throw new Error("Failed to add hat to basket");
			}
			setQuantity((prev) => {
				const updated = prev + 1;
				onQuantityChange(basketItem.id, updated); // notify parent
				return updated;
			});
			const result = await res.text();
			console.log(result);
		} catch (err) {
			console.error("Error adding hat to basket: ", err);
		}
	}

	async function decrementHatInBasket() {
		const customerId = basketItem.customer_id;
		const productId = basketItem.id;

		if (quantity === 1) {
			await deleteBasketItemCompletely(customerId, productId);
			return;
		}

		await decrementBasketItemQuantity(customerId, productId);
	}

	async function deleteBasketItemCompletely(
		customerId: number,
		productId: number
	) {
		try {
			const res = await fetch(
				`http://localhost:3000/customers/${customerId}/basket/${productId}`,
				{ method: "DELETE" }
			);

			if (!res.ok) {
				throw new Error("Failed to delete item from basket");
			}

			onDelete(productId); // Tell parent to remove it from state
		} catch (err) {
			console.error("Error deleting item:", err);
		}
	}

	async function decrementBasketItemQuantity(
		customerId: number,
		productId: number
	) {
		try {
			const res = await fetch(
				`http://localhost:3000/customers/${customerId}/basket/${productId}`,
				{
					method: "PUT"
				}
			);
			if (!res.ok) {
				throw new Error("Failed to remove hat from basket");
			}
			setQuantity((prev) => {
				const updated = prev - 1;
				onQuantityChange(basketItem.id, updated); // notify parent
				return updated;
			});
			const result = await res.text();
			console.log(result);
		} catch (err) {
			console.error("Error removing hat from basket:", err);
		}
	}

	return (
		<div className="flex gap-5 border rounded-2xl border-teal-200 justify-between items-start mb-5 p-2">
			<div className="basis-2/12 grow flex rounded-2xl bg-white justify-center">
				<img
					className="max-w-full max-h-32 object-contain"
					src={basketItem.img}
					alt={basketItem.description}
				/>
			</div>

			<div className="basis-6/12 grow self-center text-left">
				<h2 className="text-xl font-bold mb-2">{basketItem.name}</h2>
				<p className="text-md font-light mb-2">
					{basketItem.description}
				</p>
				<p className="text-xs mb-2">{basketItem.fullDescription}</p>
			</div>

			<div className="basis-2/12 grow flex self-center justify-center">
				<Counter
					value={quantity}
					onIncrement={incrementHatInBasket}
					onDecrement={decrementHatInBasket}
				/>
			</div>

			<div className="basis-2/12 grow flex self-center justify-center text-xl font-bold">
				<p>{basketItem.price * quantity} kr</p>
			</div>
		</div>
	);
}
