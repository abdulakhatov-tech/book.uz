import { FC } from "react";
import classNames from "classnames";
import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthorI } from "@/types";
import { LoadingSkeleton } from "./customs";
import useAuthorsFeatures from "./features";

const AuthorsComponent: FC = () => {
	const { t } = useTranslation();
	const {
		handleSearchChange,
		handleAuthor,
		loading,
		authors,
		search,
		selectedAuthor,
	} = useAuthorsFeatures();

	return (
		<div className="bg-secondary-gray py-[18px] rounded-[8px]">
			<div className="flex flex-col gap-2 px-4">
				<h4 className="text-[16px] font-semibold leading-[24px]  text-secondary-black">
					{t("books.authors")}
				</h4>

				<Label className="relative">
					<Input
						placeholder={t("books.search")}
						value={search}
						className=""
						onChange={handleSearchChange}
					/>
					<IoIosSearch className="absolute top-[50%] right-3 -translate-y-[50%] text-[22px] text-gray" />
				</Label>
			</div>
			<div className="h-[326px] thin-scrollbar mt-2 pl-4 pr-2">
				<ul className="flex flex-col gap-1 text-[#1E1E1E] h-full thin-scrollbar">
					{loading ? (
						<LoadingSkeleton />
					) : authors.length ? (
						authors.map((author: AuthorI) => (
							<li
								key={author._id}
								onClick={() => handleAuthor(author._id)}
								className={classNames(
									"py-2 px-4 hover:bg-orange hover:text-white active:opacity-75 rounded-md cursor-pointer flex items-center justify-between gap-2",
									{
										"bg-orange text-white": selectedAuthor === author._id,
									},
								)}
							>
								<span className="w-[200px]">{author.fullName}</span>
								{selectedAuthor === author._id && (
									<div className="w-[18px] h-[18px] rounded-full bg-secondary-gray flex items-center justify-center">
										<div className="bg-orange w-3 h-3 rounded-full active:w-full active:h-full transition-all"></div>
									</div>
								)}
							</li>
						))
					) : (
						<h4 className="text-[16px] text-black leading-[42px]">
							No Authors
						</h4>
					)}
				</ul>
			</div>
		</div>
	);
};

export default AuthorsComponent;
