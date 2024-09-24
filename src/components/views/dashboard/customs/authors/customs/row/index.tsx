import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { FaRegUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { formatDate } from "@/helpers";
import { AuthorRowPropsI } from "./interface";
import useAuthorsService from "@/services/authors";

const AuthorRow: React.FC<AuthorRowPropsI> = ({ author, index }) => {
	const { t } = useTranslation();
	const { deleteAuthorById } = useAuthorsService();

	return (
		<TableRow key={author._id}>
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell className="flex items-center gap-2">
				<div className="w-[30px] h-[30px] rounded-full overflow-hidden flex items-center justify-center bg-[#BC8E5B] text-white">
					{author?.imgUrl ? (
						<PhotoProvider>
							<PhotoView src={author.imgUrl}>
								<img
									src={author.imgUrl}
									className="w-full h-full object-cover"
									alt={author.fullName}
								/>
							</PhotoView>
						</PhotoProvider>
					) : (
						<FaRegUser />
					)}
				</div>

				{author.fullName}
			</TableCell>
			<TableCell>{author?.audioBookCount || 0}</TableCell>
			<TableCell>{author?.bookCount || 0}</TableCell>
			<TableCell>{author?.ebookCount || 0}</TableCell>
			<TableCell>
				{author.dateOfbirth ? formatDate(author?.dateOfbirth) : "..."}
			</TableCell>
			<TableCell>
				{author.dateOfdeath ? formatDate(author?.dateOfdeath) : "..."}
			</TableCell>
			<TableCell>
				{author?.createdAt ? formatDate(author?.createdAt) : "..."}
			</TableCell>
			<TableCell className="flex items-center justify-end gap-2">
				<Link to={`edit/${author?._id}`}>
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
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{t("dashboard.authors.are_you_sure")}
							</AlertDialogTitle>
							<AlertDialogDescription>
								{t("dashboard.authors.are_you_sure_description")}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>
								{t("dashboard.authors.cancel")}
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => deleteAuthorById.mutate(author._id)}
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
