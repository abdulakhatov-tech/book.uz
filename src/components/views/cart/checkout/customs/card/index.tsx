import { FC, ReactNode } from "react";

const Card: FC<{ title: string; children: ReactNode }> = ({
	title,
	children,
}) => {
	return (
		<div className="border-[1px] border-[#E7E7E7] w-full rounded-[16px] px-4 md:px-6 pt-4 pb-4 md:pb-6  transition-transform duration-300 ease-in-out transform hover:scale-[1] hover:shadow-md">
			<h4 className="text-[16px] md:text-[18px] font-semibold leading-[21.94px] text-black pb-4">
				{title}
			</h4>
			{children}
		</div>
	);
};

export default Card;
