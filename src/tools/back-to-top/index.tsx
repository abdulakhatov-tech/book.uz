import { useState, useEffect, type FC } from "react";
import { IoIosArrowUp } from "react-icons/io";
import clsx from "clsx";

const BackToTop: FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 200) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		setClicked(true);
		setTimeout(() => setClicked(false), 300);
	};

	return (
		<button
			onClick={scrollToTop}
			className={clsx(
				"w-9 h-9 rounded-md flex items-center justify-center bg-orange fixed left-4 bottom-6 custom-shadow transition-all duration-300 ease-out transform",
				{
					"opacity-0 pointer-events-none translate-y-2": !isVisible,
					"opacity-100 pointer-events-auto scale-110": clicked,
				},
			)}
			aria-label="Back to top"
		>
			<IoIosArrowUp className="text-[22px] text-white" />
		</button>
	);
};

export default BackToTop;
