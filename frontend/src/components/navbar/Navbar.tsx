import { MyNavlink } from "./MyNavlink";
import { useLogin } from "../../context/LoginContext";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { user } = useLogin();

	return (
		<nav className="w-full bg-white border-b border-primary px-4 py-2 z-50">
			<div className="max-w-screen-xl mx-auto flex items-center justify-between">
				{/* Left: Logo */}
				<div className="flex-shrink-0">
					<a href="/" className="flex items-center">
						<img
							src="/drippin-hats-logo.png"
							width="50"
							height="40"
							alt="Logo"
						/>
					</a>
				</div>

				{/* Center: Menu */}
				<div className="hidden sm:flex flex-1 justify-center">
					<ul className="flex items-center gap-10">
						<MyNavlink path="/" text="Home" />
						<MyNavlink path="/product" text="Shop" />
						<li className="text-sm text-gray-700">
							{user?.email ? (
								<>Welcome {user.name}</>
							) : (
								<>Welcome Guest</>
							)}
						</li>
						<MyNavlink path="/basket" text="Basket" />
						<MyNavlink path="/login" text="Login" />
					</ul>
				</div>

				{/* Right: Mobile Toggle */}
				<div className="sm:hidden flex-shrink-0">
					<button
						onClick={() => setMenuOpen((prev) => !prev)}
						aria-label="Toggle menu"
					>
						{menuOpen ? (
							<RxCross1 size={24} />
						) : (
							<RxHamburgerMenu size={24} />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{menuOpen && (
				<ul className="sm:hidden w-full bg-white flex flex-col items-center gap-6 py-6 z-40">
					<MyNavlink path="/" text="Home" />
					<MyNavlink path="/product" text="Shop" />
					<MyNavlink path="/basket" text="Basket" />
					<MyNavlink path="/login" text="Login" />
					<li className="text-sm text-gray-700 px-2">
						{user?.email ? (
							<>Welcome {user.name}</>
						) : (
							<>Welcome Guest</>
						)}
					</li>
				</ul>
			)}
		</nav>
	);
};
