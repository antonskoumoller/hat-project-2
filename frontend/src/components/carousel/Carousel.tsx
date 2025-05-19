import { useState, useEffect } from "react";
import ItemCard, { HatItem } from "../ItemCard";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// export interface CarouselProps
type CarouselProps = {
	CarouselHats: HatItem[];
};

export default function Carousel({ CarouselHats }: CarouselProps) {
	// useStates; index for the current slide, id of hatItem if open overlay, hats according to screensize
	// one holding the id of hat-item opened in the overlay, one holding
	const [currentSlide, setCurrentSlide] = useState(0);
	const [openOverlayIds, setOpenOverlayIds] = useState<Set<number>>(
		new Set()
	);
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

	// Handling changes in overlay
	const isOverlayActive = openOverlayIds.size > 0;
	const handleOverlayChange = (id: number, isOpen: boolean) => {
		setOpenOverlayIds((prev) => {
			const countOpenOverlays = new Set(prev);
			if (isOpen) {
				countOpenOverlays.add(id);
			} else {
				countOpenOverlays.delete(id);
			}
			return countOpenOverlays;
		});
	};

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
		if (!isOverlayActive) {
			const timer = setInterval(() => {
				nextSlide();
			}, 7000);

			// Clearing the timer when the component rerenders
			return () => clearInterval(timer);
		}
	}, [currentSlide, isOverlayActive]);

	return (
		<div className="w-full h-3/4 flex justify-center items-center">
			<div className="relative flex items-center w-full max-w-6xl">
				{/*Cards*/}
				<div className="flex justify-center gap-6 w-full h-full p-12">
					{currentHats.map((hat) => (
						<div key={hat.id} className="flex grow max-w-xs">
							<ItemCard
								hat={hat}
								overlayStatus={(isOpen) =>
									handleOverlayChange(hat.id, isOpen)
								}
							/>
						</div>
					))}
				</div>

				{/* Navigation Buttons*/}
				<button
					onClick={prevSlide}
					className="absolute left-0 top-1/2 p-3"
				>
					<SlArrowLeft className="text-primary w-6 h-6 hover:text-primary-accent" />
				</button>

				<button
					onClick={nextSlide}
					className="absolute right-0 top-1/2 p-3"
				>
					<SlArrowRight className="text-primary w-6 h-6 hover:text-primary-accent" />
				</button>
			</div>
		</div>
	);
}
