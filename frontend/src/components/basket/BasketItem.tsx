import React from "react";
import { useBasket } from "../../context/BasketContext";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";
import type { HatItem } from "../ItemCard";
import { ShowProductOverlay } from "../productOverlay/ProductOverlay";

export type BasketItemProps = HatItem & {
	quantity: number;
	customer_id: string;
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
			<button
				className="text-primary hover:text-primary-accent"
				onClick={onIncrement}
			>
				<FaRegSquarePlus className="w-6 h-6" />
			</button>
			<span className="text-md p-1 md:p-2 md:text-2xl font-bold">
				{value}
			</span>

			<button
				className="text-secondary hover:text-secondary-accent"
				onClick={onDecrement}
			>
				<FaRegSquareMinus className=" w-6 h-6" />
			</button>
		</div>
	);
}

export default function BasketItem(basketItem: BasketItemProps) {
	const { addItem, removeItem } = useBasket();
	const [overlayActive, setOverlayActive] = React.useState(false);

	return (
		<>
			<div className="relative">
				{overlayActive && (
					<ShowProductOverlay
						onClose={() => setOverlayActive(false)}
						hat={basketItem}
					/>
				)}
				<div className="flex gap-5 border rounded-2xl border-primary justify-between items-start mb-5 p-2">
					<div className="basis-2/12 grow flex rounded-2xl bg-white justify-center">
						<img
							className="max-w-full max-h-32 object-contain"
							src={basketItem.img}
							alt={basketItem.description}
							onClick={() => setOverlayActive(true)}
						/>
					</div>

					<div
						className="basis-6/12 grow self-center text-left"
						onClick={() => setOverlayActive(true)}
					>
						<h2 className="text-xl font-bold mb-2">
							{basketItem.name}
						</h2>
						<p className="hidden sm:block text-md font-light mb-2">
							{basketItem.description}
						</p>
						<p className="hidden md:block text-xs mb-2">
							{basketItem.fullDescription}
						</p>
					</div>

					<div className="basis-2/12 grow flex self-center justify-center">
						<Counter
							value={basketItem.quantity}
							onIncrement={() => addItem(basketItem)}
							onDecrement={() => removeItem(basketItem)}
						/>
					</div>

					<div className="basis-2/12 grow flex self-center justify-center text-md md:text-xl font-bold">
						<p>{basketItem.price * basketItem.quantity} kr</p>
					</div>
				</div>
			</div>
		</>
	);
}
