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
					className="fixed inset-0 z-[1000] bg-black/50 overflow-y-auto p-4"
					onClick={onClose}
				>
					<div className="flex justify-center items-start min-h-full">
						<div
							className="relative flex flex-col bg-white p-5 rounded-xl w-full max-w-2xl mt-10"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex flex-col md:flex-row gap-5 flex-grow overflow-auto">
								<OverlayContent hat={hat} />
								<OverlayImage hat={hat} />
							</div>
							<OverlayButtons onClose={onClose} hat={hat} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
