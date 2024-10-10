import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { NewsI } from "@/types";
import { formatDate } from "@/helpers";

const NewsItem: FC<NewsI> = ({_id, imgUrl, title, createdAt, type, book }) => {
	const navigate = useNavigate();

	// Function to handle navigation based on the type
	const handleClick = (): void => {
		if (type === "news") {
			navigate(`/news/${_id}`);
		} else if (type === "newBook") {
			navigate(`/books/details/${book?._id}`);
		}
	};

	return (
		<article
			className="relative border rounded-[8px] overflow-hidden bg-gray-100 cursor-pointer  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50"
			onClick={handleClick}
			role="button"
			tabIndex={0} // For accessibility
		>
			<div className="h-full min-h-[260px] max-h-[260px] bg-gray-100">
				<img
					src={imgUrl}
					alt={title || "news"}
					loading="lazy"
					className="w-full h-full object-cover" // Ensures the image covers the container
				/>
			</div>
			<div className="absolute inset-x-4 bottom-4">
				<p className="text-white text-[14px] font-medium leading-[16.94px]">
					{formatDate(createdAt)}
				</p>
				<h4 className="text-white text-[18px] font-semibold leading-[25.2px] truncate-two-lines">
					{title}
				</h4>
			</div>
		</article>
	);
};

export default NewsItem;
