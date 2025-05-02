import React from "react";

export type HatItem = {
	id: number;
	name: string;
	//img: string;
	//description: string;
	//fullDescription: string;
	//category: string;
	//popular: boolean;
	//price: number;
	//brand: string;
};

type Props = {
	hat: HatItem;
};
export default function ItemCard({ hat }: Props) {
	return (
		<div>
			<h3>{hat.name}</h3>
		</div>
	);
}
