import React, { useState, useEffect } from "react";
import ItemCard, { HatItem } from "./ItemCard";

type CarouselProps = {
	CarouselHats: HatItem[];
	hatsPerSlide?: number; // ??
};

export default function Carousel({
	CarouselHats,
	hatsPerSlide = 3
}: CarouselProps) {
	// State holding the index for the current slide
	const [currentSlide, setCurrentSlide] = useState(0);

	// ceil rounds up the number
	const numOfSlides = Math.ceil(CarouselHats.length / hatsPerSlide);

	// Slicing the current group of hats into slides
	const startHat = currentSlide * hatsPerSlide;
	// Array with the
	const currentHats = CarouselHats.slice(startHat, startHat + hatsPerSlide);

	// Change slide every 7. second
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 7000);

		// Clearing the timer when the component unmounts
		return () => clearInterval(interval);
	}, [currentSlide]);

	// navigate to previous slide
	function prevSlide() {
		setCurrentSlide((prevSlide) =>
			prevSlide <= 0 ? numOfSlides - 1 : prevSlide - 1
		);
	}

	// navigate to next slide
	function nextSlide() {
		setCurrentSlide((prevSlide) =>
			prevSlide >= numOfSlides - 1 ? 0 : prevSlide + 1
		);
	}

	console.log(
		"Index for current slide:",
		currentSlide,
		"start hat:",
		startHat,
		"currentHats:",
		currentHats
	);

	console.log("CarouselHats length:", CarouselHats.length);

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
					<img src="/leftIcon.png" alt="left icon" />
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
