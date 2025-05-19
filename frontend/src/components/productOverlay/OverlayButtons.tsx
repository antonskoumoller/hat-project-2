import { HatItem } from "../ItemCard";
import { useBasket } from "../../context/BasketContext.tsx";

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
				className="px-4 py-2 border border-[#20c997] text-[#20c997] rounded-md hover:bg-[#20c997] hover:text-[#79dfc1] hover:border-[#79dfc1] transition"
			>
				Add to Cart
			</button>{" "}
			{}
			<button
				className="px-4 py-2 border border-[#20c997] text-[#20c997] rounded-md hover:bg-[#20c997] hover:text-[#79dfc1] hover:border-[#79dfc1] transition"
				onClick={onClose}
			>
				{" "}
				Close{" "}
			</button>
		</div>
	);
};
