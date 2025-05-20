import { useState, useEffect } from "react";
import Carousel from "../components/carousel/Carousel";
import { HatItem } from "../components/ItemCard";

export default function HomePage() {
	const [popularHats, setPopularHats] = useState<HatItem[]>([]);

	// Async function that fetch all hats using endpoint
	async function fetchAllHats(): Promise<HatItem[]> {
		const res = await fetch("http://localhost:3000/products");
		if (!res.ok) throw new Error("Failed to retrieve hats");
		return res.json();
	}

	useEffect(() => {
		fetchAllHats()
			.then((hats) => setPopularHats(hats.filter((hat) => hat.popular)))
			.catch((error) => console.error("Failed to fetch hats:", error));
	}, []);

	return (
		<div className="w-full h-full p-6">
			<div className="w-full h-3/4 border rounded-lg border-transparent p-6">
				
				<Carousel CarouselHats={popularHats} />
			</div>
		</div>
	);
}
