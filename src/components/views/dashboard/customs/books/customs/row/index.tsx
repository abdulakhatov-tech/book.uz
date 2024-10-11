import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { MdDelete } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDate, formatPrice } from "@/helpers";
import { BookRowPropsI } from "./interface";
import useBooksService from "@/services/books";
const AuthorRow: React.FC<BookRowPropsI> = ({ book, index }) => {
	const { t } = useTranslation();
	const { deleteBookById } = useBooksService();

	return (
		<TableRow>
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell className="flex items-center gap-3">
				<div className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-[#BC8E5B] text-white">
					{book?.imgUrl ? (
						<PhotoProvider>
							<PhotoView src={book.imgUrl}>
								<img
									src={book.imgUrl}
									className="w-full h-full object-cover"
									alt={book.name}
								/>
							</PhotoView>
						</PhotoProvider>
					) : (
						<FaRegUser />
					)}
				</div>
				{book.name}
			</TableCell>
			<TableCell>{book?.genre?.name}</TableCell>
			<TableCell>{book?.author?.fullName || "..."}</TableCell>
			<TableCell>{book?.amount}</TableCell>
			<TableCell>{formatPrice(book?.bookPrice)}</TableCell>
			<TableCell>{book?.cover}</TableCell>
			<TableCell>
				{book?.createdAt ? formatDate(book?.createdAt) : "..."}
			</TableCell>
			<TableCell className="flex items-center justify-end gap-2">
				<Link to={`edit/${book?._id}`}>
					<Button variant="secondary">
						<FaUserEdit className="text-[22px]" />
					</Button>
				</Link>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="secondary">
							<MdDelete className="text-[22px] text-[crimson]" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="w-[350px]">
						<AlertDialogHeader>
							<AlertDialogTitle>
								{t("dashboard.books.are_you_sure")}
							</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>
								{t("dashboard.authors.cancel")}
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => deleteBookById.mutate(book._id)}
								className="bg-[crimson] hover:bg-[crimson]"
							>
								{t("dashboard.authors.continue")}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</TableCell>
		</TableRow>
	);
};
export default AuthorRow;
