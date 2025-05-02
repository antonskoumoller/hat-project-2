import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { HatItem } from "./ItemCard";

export default function HomePage() {
	// Loadhats()
	// Check if logged in? In App
	// Get CarouselCards()

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
			}
		];

		setHats(testHats);
	}, []);

	return (
		// <Navbar/>
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Popular Items</h1>
			<Carousel CarouselHats={hats} hatsPerSlide={3} />
		</div>
	);
}
