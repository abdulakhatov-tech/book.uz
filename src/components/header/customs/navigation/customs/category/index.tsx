import type React from "react";
import { NavLink } from "react-router-dom";

const categories = [
	{ label: "Kitoblar", path: "/books" },
	{ label: "To'plamlar", path: "/packages" },
	{ label: "Mualliflar", path: "/authors" },
	{ label: "Chegirmalar", path: "/discounts" },
];

const Category: React.FC<{ className: string }> = ({ className }) => {
	return (
		<ul className={className}>
			{categories.map((category) => (
				<li key={category.path}>
					<NavLink
						to={category.path}
						className="text-[#000] text-[16px] font-normal"
					>
						{category.label}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default Category;
