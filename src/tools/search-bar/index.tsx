import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

const SearchBar: FC<{ className?: string }> = ({ className }) => {
	const { t } = useTranslation();
	const [, setSearchParams] = useSearchParams();

	const handleSearch = useCallback(
		(searchValue: string) => {
			setSearchParams((prevParams) => {
				const updatedParams = new URLSearchParams(prevParams.toString());

				if (searchValue) {
					updatedParams.set("search", searchValue);
				} else {
					updatedParams.delete("search");
				}

				return updatedParams;
			});
		},
		[setSearchParams],
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.trim();
		handleSearch(searchValue);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent the form's default submit behavior
		const form = e.currentTarget;
		const input = form.querySelector("input") as HTMLInputElement;
		if (input) {
			handleSearch(input.value.trim());
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				onChange={handleChange}
				placeholder={`${t("general.search")}...`}
				className={className ? className : "min-w-[200px] md:min-w-[300px]"}
			/>
		</form>
	);
};

export default SearchBar;
