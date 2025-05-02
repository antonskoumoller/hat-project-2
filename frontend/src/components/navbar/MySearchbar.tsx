export const MySearchbar = () => {
	return (
		<li className="flex items-center flex-grow justify-center  ">
			<input
				type="text"
				placeholder="Search..."
				className="border border-[#20c997] mb-2 rounded-md px-4  w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#20c997]"
			/>
		</li>
	);
};
