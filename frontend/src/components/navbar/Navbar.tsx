import { MyNavlink } from "./MyNavlink";
import { useLogin } from "../../context/LoginContext";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const loginContext = useLogin();
	const { user } = loginContext;
	return (
		<nav className="w-full bg-white border-b border-primary px-4 py-2 z-50 relative">
			<div className="flex items-center justify-between">
				{/* Logo */}
				<a href="/" className="flex items-center">
					<img src="/drippin-hats-logo.png" width="50" height="40" />
				</a>

				{/* Hamburger Menu Icon (mobile only) */}
				<button
					className="sm:hidden"
					onClick={() => setMenuOpen((prev) => !prev)}
					aria-label="Toggle menu"
				>
					{menuOpen ? (
						<RxCross1 size={24} />
					) : (
						<RxHamburgerMenu size={24} />
					)}
				</button>

				{/* Desktop Menu */}
				<ul className="hidden sm:flex w-full items-center gap-4 justify-evenly">
					<MyNavlink path="/" text="Home" />
					<MyNavlink path="/product" text="Shop" />
					<li className="text-sm text-gray-700">
						<h1>
							{user?.email ? (
								<>Welcome {user.name}</>
							) : (
								<>Welcome Guest</>
							)}
						</h1>
					</li>
					<MyNavlink path="/basket" text="Basket" />
					<MyNavlink path="/login" text="Login" />
				</ul>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<ul className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 z-40">
					<MyNavlink path="/" text="Home" />
					<MyNavlink path="/product" text="Shop" />
					<MyNavlink path="/basket" text="Basket" />
					<MyNavlink path="/login" text="Login" />
					<li className="text-sm text-gray-700 px-2">
						<h1>
							{user?.email ? (
								<>Welcome {user.name}</>
							) : (
								<>Welcome Guest</>
							)}
						</h1>
					</li>
				</ul>
			)}
		</nav>
	);
};
