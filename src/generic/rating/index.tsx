import { FC, useState, useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import { RatingProps } from "./interface";

const Rating: FC<RatingProps> = ({
	rating = 0,
	maxStars = 5,
	onRatingChange,
	disabled = false,
	className,
}) => {
	const [hoverRating, setHoverRating] = useState<number | null>(null);
	const [selectedRating, setSelectedRating] = useState<number>(rating);

	// Sync internal state with prop if rating prop changes
	useEffect(() => {
		setSelectedRating(rating);
	}, [rating]);

	// Handle click to set the rating
	const handleRatingClick = (newRating: number) => {
		setSelectedRating(newRating);
		if (onRatingChange) {
			onRatingChange(newRating);
		}
	};

	// Render stars dynamically with hover and click handling
	const renderStars = () => {
		return Array.from({ length: maxStars }, (_, index) => {
			const starValue = index + 1;
			const isFilled = hoverRating
				? starValue <= hoverRating
				: starValue <= selectedRating;

			return (
				<IoMdStar
					key={index}
					className={`cursor-pointer transition-all duration-200 ${
						className ? className : "w-6 h-6"
					} ${isFilled ? "text-[#FAAF00]" : "text-[#5E5E5E]"}`}
					onMouseEnter={() => !disabled && setHoverRating(starValue)}
					onMouseLeave={() => !disabled && setHoverRating(null)}
					onClick={() => !disabled && handleRatingClick(starValue)}
				/>
			);
		});
	};

	return <div className="flex items-center gap-1">{renderStars()}</div>;
};

export default Rating;
