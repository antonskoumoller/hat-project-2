import React, { useState, useEffect } from "react";
import type { BasketItemProps } from "./BasketItem";
import BasketItem from "./BasketItem";
import { BsShopWindow } from "react-icons/bs";

export type BasketProps = {
	basketItems: BasketItemProps[];
	price: number;
};

export default function Basket({ basketItems, price }: BasketProps) {
	const [items, setItems] = useState<BasketItemProps[]>(basketItems);
	const [totalPrice, setTotalPrice] = useState<number>(price);

	useEffect(() => {
		const total = items.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);
		setTotalPrice(total);
	}, [items]);

	function handleQuantityChange(productId: number, newQuantity: number) {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === productId
					? { ...item, quantity: newQuantity }
					: item
			)
		);
	}

	function handleDeleteItem(productId: number) {
		setItems((prev) =>
			prev.filter((basketItem) => basketItem.id !== productId)
		);
	}

	return (
		<div>
			<div className="flex gap-5 justify-between mb-2 p-2">
				<div className="basis-2/12 grow text-left">Product</div>
				<div className="basis-6/12 grow text-left">Description</div>
				<div className="basis-2/12 grow text-left">Quantity</div>
				<div className="basis-2/12 grow text-left">Price</div>
			</div>
			<div>
				{items.map((item) => (
					<BasketItem
						key={item.id}
						{...item}
						onDelete={handleDeleteItem}
						onQuantityChange={handleQuantityChange}
					/>
				))}
			</div>

			<div className="flex gap-5 justify-between mb-2 p-2">
				<div className="basis-10/12 grow text-left inline">
					<button className="flex items-center gap-2 bg-teal-300 p-4 rounded-lg hover:bg-teal-200">
						<BsShopWindow /> Continue shopping
					</button>
				</div>
				<div className="basis-2/12 grow self-center justify-center">
					<span className="text-lg mr-2">Total: </span>
					<span className="text-3xl font-bold">{totalPrice}</span>
				</div>
			</div>
		</div>
	);
}
