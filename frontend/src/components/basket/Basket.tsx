import BasketItem from "./BasketItem";
import { BsShopWindow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../../context/BasketContext";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Basket() {
	const { items, totalPrice, clearBasket } = useBasket();
	const navigate = useNavigate();

	return (
		<div>
			<div className="flex gap-5 justify-between mb-2 p-2">
				<div className="basis-2/12 grow text-left">Product</div>
				<div className="basis-6/12 grow text-left">Description</div>
				<div className="basis-2/12 grow text-left">Quantity</div>
				<div className="basis-2/12 grow text-left">Price</div>
			</div>
			<div>
				{items.map((item) => (
					<BasketItem key={item.id} {...item} />
				))}
			</div>

			<div className="flex gap-5 justify-between mb-2 p-2">
				<div className="basis-10/12 grow text-left flex gap-4">
					<button
						className="btn-primary flex items-center gap-2"
						onClick={() => navigate("/product")}
					>
						<BsShopWindow /> Continue shopping
					</button>
					<button
						className="btn-secondary flex items-center gap-2"
						onClick={() => clearBasket()}
					>
						<FaRegTrashAlt /> Clear Basket
					</button>
				</div>
				<div className="basis-2/12 grow self-center justify-center">
					<span className="text-lg mr-2">Total: </span>
					<span className="text-3xl font-bold">{totalPrice} kr</span>
				</div>
			</div>
		</div>
	);
}
// flex items-center gap-2 bg-teal-300 p-4 rounded-lg hover:bg-teal-200