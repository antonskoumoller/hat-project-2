import React, { useState } from "react";
import ItemCard, { HatItem } from "./ItemCard";

type CarouselProps = {
	CarouselHats: HatItem[];
	hatsPerSlide?: number;
};

export default function Carousel({
	CarouselHats,
	hatsPerSlide = 3
}: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	// ceil rounds up the number
	const totalSlides = Math.ceil(CarouselHats.length / hatsPerSlide);

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % totalSlides);
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
	};

	// Slice current group of hats to show
	const start = currentIndex * hatsPerSlide;
	const currentHats = CarouselHats.slice(start, start + hatsPerSlide);

	return (
		// max-w-xl mx-auto overflow-hidden"
		<div className="relative w-full">
			{/*Cards    (transition-transform duration-500 ease-in-out)*/}
			<div className="flex justify-center gap-4 transition-all">
				{currentHats.map((hat) => (
					<div key={hat.id} className="flex-shrink-0">
						<ItemCard hat={hat} />
					</div>
				))}
			</div>

			{/* Navigation Buttons */}
			<div className="flex justify-between mt-4">
				<button
					onClick={prevSlide}
					className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
				>
					←
				</button>
				<button
					onClick={nextSlide}
					className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
				>
					→
				</button>
			</div>
		</div>
	);
}
