import { NavLink } from "react-router-dom";

export interface MyNavlinkProps {
	path: string;
	text: string;
}

export const MyNavlink = (props: MyNavlinkProps) => {
	return (
		<li className="-mb-px mr-1 flex-grow text-center">
			<NavLink
				className={({ isActive }) =>
					isActive
						? "active bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 border-[#20c997] font-semibold"
						: ""
				}
				to={props.path}
			>
				{props.text}
			</NavLink>
		</li>
	);
};
