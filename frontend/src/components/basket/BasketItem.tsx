import React from "react";
import { useBasket } from "../../context/BasketContext";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";
import type { HatItem } from "../ItemCard";

export type BasketItemProps = HatItem & {
	quantity: number;
	customer_id: number;
};

// TODO: Make clicking the button show the product overlay on the BasketPage.tsx

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

export default function BasketItem(basketItem: BasketItemProps) {
	const { addItem, removeItem } = useBasket();

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
					value={basketItem.quantity}
					onIncrement={() => addItem(basketItem)}
					onDecrement={() => removeItem(basketItem.id)}
				/>
			</div>

			<div className="basis-2/12 grow flex self-center justify-center text-xl font-bold">
				<p>{basketItem.price * basketItem.quantity} kr</p>
			</div>
		</div>
	);
}
