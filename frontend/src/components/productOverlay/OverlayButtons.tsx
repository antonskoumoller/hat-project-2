import { HatItem } from "../ItemCard";
import * as React from "react";
import { useBasket } from "../../context/BasketContext.tsx";
import { CiShoppingBasket } from "react-icons/ci";
import Alert from "@mui/material/Alert";

type OverlayButtonsProps = {
	onClose: () => void;
	hat: HatItem;
};

export const OverlayButtons = ({ onClose, hat }: OverlayButtonsProps) => {
	const { addItem } = useBasket();
	const [showAlert, setShowAlert] = React.useState(false);

	function handleAdd() {
		addItem({ ...hat });
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 5000);
	}

	return (
		<div className="flex justify-center gap-2 mt-4 ">
			{showAlert && (
				<div className="absolute top-2 left-2 right-2 z-50">
					<Alert severity="success">
						{hat.name} added to basket!
					</Alert>
				</div>
			)}
			<button
				onClick={handleAdd}
				className="px-4 py-2 btn-primary flex items-center gap-2"
			>
				<CiShoppingBasket />
				Add to Cart
			</button>{" "}
			{}
			<button className="px-4 py-2 btn-secondary" onClick={onClose}>
				{" "}
				Close{" "}
			</button>
		</div>
	);
};
