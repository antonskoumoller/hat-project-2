import React, { useState } from "react";
import { Card } from "./Card";

type CarouselProps = {
	itemsPerSlide: number;
};

export const Carousel = ({itemsPerSlide }: CarouselProps) => {
	const [slides, setSlides] = useState<Hat[][]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Fetching all the popular hat cards on mount (on render?)
	const useEffect(()=> {
		const hats: Hat[] = .getall
	})
	
	
	
	
	
	
	const prevSlide = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? carouselItems.length - 1 : prev - 1
		);
	};

	const nextSlide = () => {
		setCurrentIndex((prev) =>
			prev === carouselItems.length - 1 ? 0 : prev + 1
		);
	};

	return (
		<div className="relative w-full max-w-xl mx-auto overflow-hidden">
			<div
				className="flex transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{carouselItems.map((item, index) => (
					<div key={index} className="w-full flex-shrink-0">
						{item}
					</div>
				))}
			</div>

			{/* Optional navigation */}
			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
			>
				←
			</button>
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
			>
				→
			</button>
		</div>
	);
};
