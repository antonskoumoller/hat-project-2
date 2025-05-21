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
			<div>
				<h1>Basket Contents</h1>
			</div>
			<div>
				{items.map((item) => (
					<BasketItem key={item.id} {...item} />
				))}
			</div>

			<div className="flex gap-5 justify-between mb-2 p-2">
				<div className="basis-10/12 grow text-left flex flex-wrap gap-4">
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
				<div className="basis-4/12 grow flex justify-end items-end gap-2">
					<span className="text-md sm:text-xl">Total:</span>
					<span className="text-md sm:text-3xl font-bold">
						{totalPrice} kr
					</span>
				</div>
			</div>
		</div>
	);
}
