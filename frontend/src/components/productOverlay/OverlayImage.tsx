import { HatItem } from "../ItemCard.tsx";

type OverlayImageProps = {
  hat: HatItem;
};

export const OverlayImage = ({ hat }: OverlayImageProps) => {
  return (
    <div className="w-[300px] h-[250px]  flex justify-center items-center">
      <img
        src={hat.img}
        alt={hat.name}
        className="max-w-full max-h-full object-cover"
      />
    </div>
  );
};
