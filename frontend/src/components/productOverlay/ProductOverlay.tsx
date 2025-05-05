import { useEffect, useState } from "react";
import { HatItem } from "../ItemCard";
import { OverlayContent } from "./OverlayContent.tsx";
import { OverlayImage } from "./OverlayImage";
import { OverlayButtons } from "./OverlayButtons.tsx";

type ShowProductOverlayProps = {
  id: number;
  onClose: () => void; // Declare the onClose prop
};

export const ShowProductOverlay = ({
  id,
  onClose,
}: ShowProductOverlayProps) => {
  const [hat, setHat] = useState<HatItem | null>(null);

  useEffect(() => {
    const fetchHat = async () => {
      const res = await fetch(`http://localhost:3000/products/${id}`); // Fetch a specific hat by ID
      if (!res.ok) throw new Error("Failed to retrieve hat");
      const data = await res.json();
      setHat(data);
    };

    fetchHat()
      .then(() => console.log("Fetched hat successfully"))
      .catch((error) => console.error("Failed to fetch hat:", error));
  }, []);

  return (
    <>
      {hat && (
        <div
          className="fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black/50 z-[1000] p-5"
          onClick={onClose}
        >
          <div
            className="relative flex flex-col h-[500px] bg-white p-5 rounded-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-5 flex-grow overflow-auto">
              <OverlayContent hat={hat} />
              <OverlayImage hat={hat} />
            </div>
            <OverlayButtons onClose={onClose} />
          </div>
        </div>
      )}
    </>
  );
};
