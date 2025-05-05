import React, { useState, useEffect } from "react";
import ItemCard, { HatItem } from "../ItemCard";
import RightArrowIcon from "./RightArrowIcon";
import LeftArrowIcon from "./LeftArrowIcon";

// export interface CarouselProps
type CarouselProps = {
	CarouselHats: HatItem[];
	hatsPerSlide?: number; // ? is making the number of hatsPerSlide optional
};

export default function Carousel({
	CarouselHats,
	hatsPerSlide = 3 // sets 3 hats pr slide as default
}: CarouselProps) {
	// State holding the index for the current slide
	const [currentSlide, setCurrentSlide] = useState(0);

	// Finding the number of slides (ceil rounds up the number)
	const numOfSlides = Math.ceil(CarouselHats.length / hatsPerSlide);

	// Slicing the array of hats into slides
	const startHat = currentSlide * hatsPerSlide;
	const currentHats = CarouselHats.slice(startHat, startHat + hatsPerSlide);

	// Setting up a timer to change slide every 5. second
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		nextSlide();
	// 	}, 5000);

	// 	// Clearing the timer when the component unmounts
	// 	return () => clearInterval(interval);
	// }, [currentSlide]);

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
		"Start hat:",
		startHat,
		"CurrentHats:",
		currentHats,
		"CarouselHats length:",
		CarouselHats.length
	);

	return (
		<div>
			{/*Cards*/}
			<div className="flex justify-center gap-4 transition-all">
				{currentHats.map((hat) => (
					<div key={hat.id} className="flex-grow">
						<ItemCard hat={hat} />
					</div>
				))}
			</div>

			{/* Navigation Buttons (styling fælles div med buttons nede)px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 */}
			<div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2">
				<button
					onClick={prevSlide}
					className="bg-transparent text-[#20c997] hover:border-[#17a085] text-3xl"
				>
					<LeftArrowIcon />
				</button>
			</div>
			<div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2">
				<button
					onClick={nextSlide}
					className="bg-transparent text-[#20c997] hover:text-[#20c997] text-3xl"
				>
					<RightArrowIcon />
				</button>
			</div>
		</div>
	);
}
