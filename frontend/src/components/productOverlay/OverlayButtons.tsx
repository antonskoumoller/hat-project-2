type OverlayButtonsProps = {
  onClose: () => void;
};

export const OverlayButtons = ({ onClose }: OverlayButtonsProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4 ">
      <button className="px-4 py-2 border border-[#20c997] text-[#20c997] rounded-md hover:bg-[#20c997] hover:text-[#79dfc1] hover:border-[#79dfc1] transition">
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
