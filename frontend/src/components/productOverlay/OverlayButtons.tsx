type OverlayButtonsProps = {
  onClose: () => void;
};

export const OverlayButtons = ({ onClose }: OverlayButtonsProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4 ">
      <button className="px-4 py-2 btn-primary">
        Add to Cart
      </button>{" "}
      {}
      <button
        className="px-4 py-2 btn-primary"
        onClick={onClose}
      >
        {" "}
        Close{" "}
      </button>
    </div>
  );
};
