import { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { IoIosSearch, IoMdClose } from "react-icons/io";

import { AuthorI } from "@/types";
import useAuthorsFeatures from "./features";
import LoadingSkeleton from "@/components/common/loading-skeleton";

const GenresComponent: FC = () => {
	const { t } = useTranslation();
	const {
		handleSelectAllChange,
		handleSearchChange,
		handleAuthorChange,
		selectedAuthors,
		isAllSelected,
		setSearch,
		loading,
		search,
		data,
	} = useAuthorsFeatures();

	return (
		<div className="bg-secondary-gray py-[18px] rounded-[8px]">
			<div className="flex flex-col gap-2 px-4">
				<Label className="flex items-center gap-2">
					<Checkbox
						checked={isAllSelected}
						onCheckedChange={handleSelectAllChange}
					/>
					<h4 className="text-[16px] font-bold leading-[24px] text-secondary-black">
						{t("books.authors")}
					</h4>
				</Label>

				<Label className="relative">
					<Input
						placeholder={t("books.search")}
						value={search}
						onChange={handleSearchChange}
					/>
					{search.length ? (
						<IoMdClose
							onClick={() => setSearch("")}
							className="absolute top-[50%] right-3 -translate-y-[50%] text-[22px] text-gray"
						/>
					) : (
						<IoIosSearch className="absolute top-[50%] right-3 -translate-y-[50%] text-[22px] text-gray" />
					)}
				</Label>
			</div>
			<div className="h-[250px] thin-scrollbar mt-2 pl-2 pr-2">
				<ul
					className={classNames(
						"flex flex-col gap-1 text-[#1E1E1E] h-full thin-scrollbar",
						{
							"pl-2": loading,
						},
					)}
				>
					{loading ? (
						<LoadingSkeleton />
					) : data?.length ? (
						data.map((author: AuthorI) => (
							<Label key={author._id}>
								<li
									className={classNames(
										"py-2 px-2 hover:bg-orange text-[#1E1E1E] hover:text-white active:opacity-75 rounded-md cursor-pointer flex items-center gap-2",
									)}
								>
									<Checkbox
										checked={selectedAuthors.includes(author._id) || isAllSelected}
										onCheckedChange={() => handleAuthorChange(author._id)}
									/>
									<span className="text-[16px] leading-[24px] font-semibold">
										{author.fullName}
									</span>
								</li>
							</Label>
						))
					) : (
						<h4 className="text-[16px] text-black leading-[42px] text-center">
							No Authors
						</h4>
					)}
				</ul>
			</div>
		</div>
	);
};

export default GenresComponent;
