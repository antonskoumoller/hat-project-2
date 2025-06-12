import { useState, useEffect } from "react";
import ItemCard, { HatItem } from "../ItemCard";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Grid from "@mui/material/Grid";

// export interface CarouselProps
type CarouselProps = {
	CarouselHats: HatItem[];
};

export default function Carousel({ CarouselHats }: CarouselProps) {
	// useStates; index for the current slide and number of hats pr slide
	const [currentSlideCount, setCurrentSlideCount] = useState(0);
	const [hatsPerSlide, setHatsPerSlide] = useState(hatsAccToScreen());

	// Hats according to screen size
	function hatsAccToScreen() {
		return window.innerWidth < 900 ? 1 : 3;
	}

	// Handling number of hats when screen size changes
	useEffect(() => {
		const handleResize = () => {
			setHatsPerSlide(hatsAccToScreen());
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Creating slides for the carousel
	const numOfSlides = Math.ceil(CarouselHats.length / hatsPerSlide);
	const startHat = currentSlideCount * hatsPerSlide;
	const currentHats = CarouselHats.slice(startHat, startHat + hatsPerSlide);

	// Navigation next slide
	function nextSlide() {
		setCurrentSlideCount((slideCount) =>
			slideCount >= numOfSlides - 1 ? 0 : slideCount + 1
		);
	}

	// Navigation previous slide
	function prevSlide() {
		setCurrentSlideCount((slideCount) =>
			slideCount <= 0 ? numOfSlides - 1 : slideCount - 1
		);
	}

	return (
		<div className="relative w-full">
			<h1 className="text-left ml-6 justify-self-center">
				Popular Items
			</h1>
			<div className="relative mx-auto w-fit flex items-center justify-center mt-4">
				{/* Left Arrow */}
				<button
					onClick={prevSlide}
					className="absolute left-[-40px] z-10 p-2 bg-white rounded-full shadow"
					aria-label="Previous"
				>
					<SlArrowLeft className="text-primary w-6 h-6 hover:text-primary-accent" />
				</button>

				{/* Carousel content */}
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					justifyContent="center"
					sx={{ width: "fit-content" }}
				>
					{currentHats.map((hat) => (
						<Grid key={hat.id}>
							<ItemCard hat={hat} />
						</Grid>
					))}
				</Grid>

				{/* Right Arrow */}
				<button
					onClick={nextSlide}
					className="absolute right-[-40px] z-10 p-2 bg-white rounded-full shadow"
					aria-label="Next"
				>
					<SlArrowRight className="text-primary w-6 h-6 hover:text-primary-accent" />
				</button>
			</div>
		</div>
	);
}
