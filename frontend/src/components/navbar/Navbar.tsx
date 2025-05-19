import { MyNavlink } from "./MyNavlink";

export const Navbar = () => {
	return (
		<div className="flex flex-col w-full">
			<ul className="flex border-b px-4 border-[#20c997] my-3 top-0 w-full bg-white z-50">
				{/* Logo */}
				<li className="flex items-center justify-center mx-5">
					<a href="/">
						<img
							src="/drippin-hats-logo.png"
							width="50"
							height="40"
						/>
					</a>
				</li>

				<MyNavlink path="/" text="Home" />
				<MyNavlink path="/product" text="Shop" />

				{/* should get functionallity, when the login part is ready */}
				<li className="-mb-px mr-1 flex-grow text-center">
					Welcome Guest
				</li>

				<MyNavlink path="/basket" text="Basket" />
				<MyNavlink path="/login" text="Login" />
			</ul>
		</div>
	);
};
