export interface RatingProps {
	rating?: number;
	maxStars?: number;
	onRatingChange?: (rating: number) => void;
	disabled?: boolean;
	className?: string;
}
