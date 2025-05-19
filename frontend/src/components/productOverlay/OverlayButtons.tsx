import { HatItem } from "../ItemCard";
import { useBasket } from "../../context/BasketContext.tsx";
import { CiShoppingBasket } from "react-icons/ci";

type OverlayButtonsProps = {
	onClose: () => void;
	hat: HatItem;
};

export const OverlayButtons = ({ onClose, hat }: OverlayButtonsProps) => {
	const { addItem } = useBasket();

	function handleAddItem() {
		console.log("Adding hat from overlay:", hat);

		addItem({ ...hat });
	}

	return (
		<div className="flex justify-center gap-2 mt-4 ">
			<button
				onClick={handleAddItem}
				className="px-4 py-2 btn-primary flex items-center gap-2"
			>
				<CiShoppingBasket/>
				Add to Cart
			</button>{" "}
			{}
			<button
				className="px-4 py-2 btn-secondary"
				onClick={onClose}
			>
				{" "}
				Close{" "}
			</button>
		</div>
	);
};
