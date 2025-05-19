import { HatItem } from "../ItemCard";
import { OverlayContent } from "./OverlayContent.tsx";
import { OverlayImage } from "./OverlayImage";
import { OverlayButtons } from "./OverlayButtons.tsx";

type ShowProductOverlayProps = {
	onClose: () => void; // Declare the onClose prop
	hat: HatItem;
};

export const ShowProductOverlay = ({
	onClose,
	hat
}: ShowProductOverlayProps) => {
	return (
		<>
			{hat && (
				<div
					className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black/50 z-[1000]"
					onClick={onClose}
				>
					<div
						className="relative flex flex-col h-[400px] bg-white p-5 rounded-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex flex-col md:flex-row gap-5 flex-grow overflow-auto">
							<OverlayContent hat={hat} />
							<OverlayImage hat={hat} />
						</div>
						<OverlayButtons onClose={onClose} hat={hat} />
					</div>
				</div>
			)}
		</>
	);
};
