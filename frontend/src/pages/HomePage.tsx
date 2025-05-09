import React, { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import { HatItem } from "../components/ItemCard";

export default function HomePage() {
  const [popularHats, setPopularHats] = useState<HatItem[]>([]);

  // Async function that gets all hats using our endpoint
  async function fetchAllHats(): Promise<HatItem[]> {
    const res = await fetch("http://localhost:3000/products");
    if (!res.ok) throw new Error("Failed to retrieve hats");
    return res.json();
  }

  // UseEffect to set up all the popular hats when the component mounts
  useEffect(() => {
    fetchAllHats()
      .then((hats) => setPopularHats(hats.filter((hat) => hat.popular)))
      .catch((error) => console.error("Failed to fetch hats:", error));
  }, []);

  // UseEffect that loads all the testhats when the component mounts.
  // useEffect(() => {
  // 	const testHats = [
  // 		{
  // 			id: 1,
  // 			name: "Taco Hat",
  // 			img: "/images/taco-hat.png",
  // 			description: "Beautiful taco hat for parties and stuff",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Fun",
  // 			popular: false,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 2,
  // 			name: "Captain",
  // 			img: "/images/Kaptajn.jpg",
  // 			description: "Traditional headpiece for the born sailor",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Outdoor",
  // 			popular: true,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 3,
  // 			name: "Strawberry",
  // 			img: "/images/Strawberry.png",
  // 			description: "Cute headpiece with a summer feeling",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Kids",
  // 			popular: true,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 4,
  // 			name: "Taco Hat",
  // 			img: "/images/taco-hat.png",
  // 			description: "Beautiful taco hat for parties and stuff",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Fun",
  // 			popular: false,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 5,
  // 			name: "Taco Hat",
  // 			img: "/images/taco-hat.png",
  // 			description: "Beautiful taco hat for parties and stuff",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Fun",
  // 			popular: false,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 6,
  // 			name: "Taco Hat",
  // 			img: "/images/taco-hat.png",
  // 			description: "Beautiful taco hat for parties and stuff",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Fun",
  // 			popular: false,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 7,
  // 			name: "Captain",
  // 			img: "/images/Kaptajn.jpg",
  // 			description: "Traditional headpiece for the born sailor",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Outdoor",
  // 			popular: true,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 8,
  // 			name: "Strawberry",
  // 			img: "/images/Strawberry.png",
  // 			description: "Cute headpiece with a summer feeling",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Kids",
  // 			popular: true,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 9,
  // 			name: "Captain",
  // 			img: "/images/Kaptajn.jpg",
  // 			description: "Traditional headpiece for the born sailor",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Outdoor",
  // 			popular: true,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		},
  // 		{
  // 			id: 10,
  // 			name: "Strawberry",
  // 			img: "/images/Strawberry.png",
  // 			description: "Cute headpiece with a summer feeling",
  // 			fullDescription:
  // 				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // 			category: "Kids",
  // 			popular: true,
  // 			price: 500,
  // 			brand: "Gucci"
  // 		}
  // 	];
  // 	setPopularHats(testHats.filter((hat) => hat.popular));
  // }, []);

  return (
    <div className="w-full h-full flex justify-center items-start overflow-auto px-4 py-8">
      <div className="max-w-6xl w-full border rounded border-[#20c997] p-6">
        <h2 className="text-gray-500 text-3xl text-left font-semibold mb-6 -mt-5">
          Popular Items
        </h2>
        <Carousel CarouselHats={popularHats} hatsPerSlide={4} />
      </div>
    </div>
  );
}
// div2: "flex-grow px-4 py-8 border rounded border-[#20c997] max-w-6xl"
