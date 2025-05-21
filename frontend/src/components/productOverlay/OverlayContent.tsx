import { HatItem } from "../ItemCard.tsx";

type OverlayContentProps = {
	hat: HatItem;
};

export const OverlayContent = ({ hat }: OverlayContentProps) => {
	return (
		<div className="flex flex-col w-full overflow-y-auto p-4">
			<h1 className="text-[#20c997] w-full text-2xl font-bold mb-4 border-b pb-2">
				{hat.name}
			</h1>

			<p className="text-gray-700 w-full mb-4">{hat.fullDescription}</p>

			{/* Horizontal row for metadata */}
			<div className="flex flex-wrap justify-between items-center gap-2 w-full">
				<p className="text-gray-600 whitespace-nowrap">
					<span className="font-semibold">Brand:</span> {hat.brand}
				</p>
				<p className="text-gray-600 whitespace-nowrap">
					<span className="font-semibold">Category:</span>{" "}
					{hat.category}
				</p>
				<p className="text-gray-800 text-lg font-semibold whitespace-nowrap">
					Price: ${hat.price}
				</p>
			</div>
		</div>
	);
};
