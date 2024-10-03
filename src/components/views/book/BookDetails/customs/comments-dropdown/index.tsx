import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import Rating from "@/generic/rating";
import LoadingSpinner from "@/tools/loading-spinner";
import useCommentsDropdownFeatures from "./features";

const CommentsDropdown: FC<{ children: ReactNode }> = ({ children }) => {
	const { t } = useTranslation();
	const {
		open,
		rating,
		message,
		loading,
		onChange,
		onSubmit,
		setRating,
		reviewType,
		handleClose,
	} = useCommentsDropdownFeatures();

	return (
		<Dialog open={open}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="w-[90%] max-w-[400px] rounded-[16px]">
				<DialogHeader>
					<div className="flex items-center justify-between mb-2">
						<DialogTitle className="text-secondary-black">
							{reviewType === "edit" ? t("book.edit") : t("book.comment_on")}:
						</DialogTitle>
						<IoMdClose className="text-[24px]" onClick={handleClose} />
					</div>

					<form onSubmit={onSubmit} className="flex flex-col gap-4">
						<Textarea
							onChange={onChange}
							placeholder={
								reviewType === "edit"
									? t("book.edit")
									: t("book.comment_on") + "..."
							}
							className="resize-none"
							rows={6}
							value={message}
							disabled={loading}
						/>
						<div className="flex items-center justify-between mb-2">
							<DialogTitle className="text-secondary-black">
								{t("book.my_rating")}:
							</DialogTitle>
							<Rating onRatingChange={setRating} rating={rating} />
						</div>
						<Button
							type="submit"
							className="bg-orange hover:bg-orange"
							disabled={loading || !message.trim()}
						>
							{loading ? (
								<LoadingSpinner />
							) : reviewType === "edit" ? (
								t("book.edit")
							) : (
								t("book.send")
							)}
						</Button>
					</form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default CommentsDropdown;
