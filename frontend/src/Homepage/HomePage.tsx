import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { HatItem } from "./ItemCard";

export default function HomePage() {
	const [hats, setHats] = useState<HatItem[]>([]);

	useEffect(() => {
		const testHats: HatItem[] = [
			{
				id: 1,
				name: "Hej jeg er hat 1"
			},
			{
				id: 2,
				name: "Hej jeg er hat 2"
			},
			{
				id: 3,
				name: "Hej jeg er hat 3"
			},
			{
				id: 4,
				name: "Hej jeg er hat 4"
			},
			{
				id: 5,
				name: "Hej jeg er hat 5"
			}
		];

		setHats(testHats);
	}, []);

	return (
		// <Navbar/>
		<div className="border rounded-md">
			<h1 className="font-medium text-gray-500">Popular Items</h1>
			<Carousel CarouselHats={hats} hatsPerSlide={3} />
		</div>
	);
}

//var(<custom-property>)
