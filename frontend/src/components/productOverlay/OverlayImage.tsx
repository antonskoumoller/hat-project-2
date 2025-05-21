import { HatItem } from "../ItemCard.tsx";

type OverlayImageProps = {
	hat: HatItem;
};

export const OverlayImage = ({ hat }: OverlayImageProps) => {
	return (
		<div className="w-full md:w-[600px] h-[250px] md:h-[350px] flex justify-center items-center">
			<img
				src={hat.img}
				alt={hat.name}
				className="max-w-full max-h-full object-contain"
			/>
		</div>
	);
};
