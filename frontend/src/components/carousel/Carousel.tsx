import { useState, useEffect } from "react";
import ItemCard, { HatItem } from "../ItemCard";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// export interface CarouselProps
type CarouselProps = {
	CarouselHats: HatItem[];
	hatsPerSlide: number;
};

export default function Carousel({
	CarouselHats,
	hatsPerSlide
}: CarouselProps) {
	// useStates, one holding the index for the current slide and one holding the state of overlay
	const [currentSlide, setCurrentSlide] = useState(0);
	const [overlayOpen, setOverlayOpen] = useState(false);

	// Creating slides for the carousel
	const numOfSlides = Math.ceil(CarouselHats.length / hatsPerSlide);
	const startHat = currentSlide * hatsPerSlide;
	const currentHats = CarouselHats.slice(startHat, startHat + hatsPerSlide);

	// Navigation next slide
	function nextSlide() {
		setCurrentSlide((prevSlide) =>
			prevSlide >= numOfSlides - 1 ? 0 : prevSlide + 1
		);
	}

	// Navigation previous slide
	function prevSlide() {
		setCurrentSlide((prevSlide) =>
			prevSlide <= 0 ? numOfSlides - 1 : prevSlide - 1
		);
	}

	// Setting up a timer to change slide every 7. second
	useEffect(() => {
		if (overlayOpen) return;
		const timer = setInterval(() => {
			nextSlide();
		}, 7000);

		// Clearing the timer when the component rerenders
		return () => clearInterval(timer);
	}, [currentSlide, overlayOpen]);

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
				<SlArrowLeft
					onClick={prevSlide}
					className="text-teal-500 w-6 h-6 hover:text-teal-200"
				/>
			</div>
			<div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2">
				<SlArrowRight
					onClick={nextSlide}
					className="text-teal-500 w-6 h-6 hover:text-teal-200"
				/>
			</div>
		</div>
	);
}
