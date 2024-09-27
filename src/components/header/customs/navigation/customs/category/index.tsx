import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { MockData } from "@/utils";

const Category: FC<{ className: string }> = ({ className }) => {
	const { categories } = MockData();

	return (
		<ul className={className}>
			{categories.map((category) => (
				<li key={category.path}>
					<NavLink
						to={category.path}
						className="text-black text-[16px] leading-[19.36px] font-semibold cursor-pointer"
					>
						{category.label}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default Category;
