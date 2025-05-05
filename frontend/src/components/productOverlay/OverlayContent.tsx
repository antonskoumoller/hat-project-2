import { HatItem } from "../ItemCard.tsx";

type OverlayContentProps = {
  hat: HatItem;
};

export const OverlayContent = ({ hat }: OverlayContentProps) => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto p-4">
      <h1 className="text-[#20c997] text-2xl font-bold mb-4 border-b pb-2">
        {hat.name}
      </h1>
      <p className="text-gray-700 mb-4 flex-grow">{hat.fullDescription}</p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-15">
          <div className="text-gray-600 ">
            <p>
              <span className="font-semibold">Brand:</span> {hat.brand}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {hat.category}
            </p>
          </div>
          <p className="text-gray-800 text-lg font-semibold">
            Price: ${hat.price}
          </p>
        </div>
      </div>
    </div>
  );
};
