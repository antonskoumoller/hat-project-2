import React from "react";
import Carousel from "../components/carousel/Carousel";
import { HatItem } from "../components/ItemCard";

export default function HomePage() {
	const [popularHats, setPopularHats] = React.useState<HatItem[]>([]);

	// Async function that gets all hats using our endpoint
	async function fetchAllHats(): Promise<HatItem[]> {
		const res = await fetch("http://localhost:3000/products");
		if (!res.ok) throw new Error("Failed to retrieve hats");
		return res.json();
	}

	// UseEffect to set up all the popular hats when the component mounts
	React.useEffect(() => {
		fetchAllHats()
			.then((hats) => setPopularHats(hats.filter((hat) => hat.popular)))
			.catch((error) => console.error("Failed to fetch hats:", error));
	}, []);

	return (
		<div className="w-full h-full flex justify-center items-start overflow-auto px-4 py-8">
			<div className="max-w-6xl w-full border rounded border-[#20c997] p-6">
				<h2 className="text-gray-500 text-3xl text-left font-semibold mb-6 -mt-5">
					Popular Items
				</h2>
				<Carousel CarouselHats={popularHats} hatsPerSlide={3} />
			</div>
		</div>
	);
}
// div2: "flex-grow px-4 py-8 border rounded border-[#20c997] max-w-6xl"
