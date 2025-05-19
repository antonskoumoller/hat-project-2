import * as React from "react";
import { ShowProductOverlay } from "./productOverlay/ProductOverlay";
import { useBasket } from "../context/BasketContext";
import Alert from "@mui/material/Alert";
import { CiShoppingBasket } from "react-icons/ci";

export type HatItem = {
	id: number;
	name: string;
	img: string;
	description: string;
	fullDescription: string;
	category: string;
	popular: boolean;
	price: number;
	brand: string;
};
type Props = {
	hat: HatItem;
	overlayStatus?: (isOpen: boolean) => void; // optional prop
};

export default function ItemCard({ hat, overlayStatus }: Props) {
	const [overlayActive, setOverlayActive] = React.useState(false);
	const [showAlert, setShowAlert] = React.useState(false);
	const { addItem } = useBasket();

	function handleAdd() {
		addItem({ ...hat });
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 5000);
	}

	// useEffect that (via callback) updates the carousel if the state of overlayActive changes
	React.useEffect(() => {
		if (overlayStatus) {
			overlayStatus(overlayActive);
		}
	}, [overlayActive]);

	return (
		<>
			{overlayActive ? (
				<ShowProductOverlay
					onClose={() => setOverlayActive(false)}
					hat={hat}
				/>
			) : (
				<div className="relative flex flex-col max-w-sm w-full border border-[#20c997] rounded-xl overflow-hidden shadow-md transition hover:shadow-lg pt-4">
					{showAlert && (
						<div className="absolute top-2 left-2 right-2 z-50">
							<Alert severity="success">
								Item {hat.name} to basket!
							</Alert>
						</div>
					)}
					<img
						src={hat.img}
						alt={hat.name}
						className="w-full h-48 object-contain"
					/>
					<div className="p-4 flex flex-col flex-grow">
						<h2 className="text-xl font-semibold text-gray-800 mb-1">
							{hat.name}
						</h2>
						<p className="text-sm text-gray-600 mb-4 line-clamp-1">
							{hat.description}
						</p>
					</div>
					<div className="flex gap-2 p-4 pt-0 mt-auto">
						<button
							onClick={handleAdd}
							className="flex-1 py-2 btn-primary flex items-center gap-4"
						>
							<CiShoppingBasket/>
							Add to cart
						</button>
						<button
							onClick={() => setOverlayActive(true)}
							className="flex-1 py-2 btn-primary"
						>
							Show hat
						</button>
					</div>
				</div>
			)}
		</>
	);
}
