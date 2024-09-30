import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from "react-icons/io";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Genres } from "@/components/views/home/intro/customs";

const GenresComponent: FC = () => {
	const { t } = useTranslation();
	const [search, setSearch] = useState("");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		console.log(search);
	};

	return (
		<div className="bg-secondary-gray py-[18px] rounded-[8px]">
			<div className="flex flex-col gap-2 px-4">
				<h4 className="text-[16px] font-semibold leading-[24px]  text-secondary-black">
					{t("books.genres")}
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
			<div className="h-[250px] thin-scrollbar mt-2 pl-4 pr-2">
				<Genres isBooksPage search={search} setSearch={setSearch} />
			</div>
		</div>
	);
};

export default GenresComponent;
