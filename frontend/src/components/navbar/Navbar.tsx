import { MyNavlink } from "./MyNavlink";
import { MySearchbar } from "./MySearchbar";

export const Navbar = () => {
	return (
		<ul className="flex border-b border-[#20c997] fixed top-0 w-full bg-white z-50  pt-4">
			{/* Logo */}
			<li className="flex items-center justify-center mr-4">
				<a href="/">
					<img src="/drippin-hats-logo.png" width="50" height="40" />
				</a>
			</li>

			<MyNavlink path="/" text="Home" />
			<MyNavlink path="/product" text="Shop" />
			<MySearchbar />

			{/* should get functionallity, when the login part is ready */}
			<li className="-mb-px mr-1 flex-grow text-center">Welcome Guest</li>

			<MyNavlink path="/basket" text="Basket" />
			<MyNavlink path="/login" text="Login" />
		</ul>
	);
};
