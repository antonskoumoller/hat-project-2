import { useState, useEffect } from "react";
import ItemCard, { HatItem } from "../ItemCard";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Grid } from "@mui/material";

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
		return window.innerWidth < 768 ? 1 : 3;
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
		<div>
			<h1 className="text-left ml-6">Popular Items</h1>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
				alignItems="center"
			>
				<button onClick={prevSlide} className="absolute left-0 p-3">
					<SlArrowLeft className="text-primary w-6 h-6 hover:text-primary-accent" />
				</button>
				{currentHats.map((hat) => (
					<Grid size={4}>
						<ItemCard hat={hat} />
					</Grid>
				))}
				<button onClick={nextSlide} className="absolute right-0 p-3">
					<SlArrowRight className="text-primary w-6 h-6 hover:text-primary-accent" />
				</button>
			</Grid>
		</div>
	);
}
