import BasketItem from "./BasketItem";
import { BsShopWindow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../../context/BasketContext";

export default function Basket() {
	const { items, totalPrice } = useBasket();
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
				<div className="basis-10/12 grow text-left inline">
					<button
						className="flex items-center gap-2 bg-teal-300 p-4 rounded-lg hover:bg-teal-200"
						onClick={() => navigate("/product")}
					>
						<BsShopWindow /> Continue shopping
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
