import type React from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Locale: React.FC<{ className: string }> = ({ className }) => {
	const { i18n } = useTranslation();

	// Getting the current language from localStorage.
	const currentLang = localStorage.getItem("i18nextLng") || "en-US";

	useEffect(() => {
		const supportedLanguages = ["en", "uz", "ru"];
		if (!supportedLanguages.includes(currentLang)) {
			localStorage.setItem("i18nextLng", "uz");
		}
	}, [currentLang]);

	const onLanguageHandler = (lang: string): void => {
		i18n.changeLanguage(lang);
		localStorage.setItem("i18nextLng", lang);
	};

	return (
		<Select onValueChange={(e: string) => onLanguageHandler(e)}>
			<SelectTrigger
				className={`w-[40px] h-fit px-0 py-0 border-none text-[15px] ${className}`}
			>
				<SelectValue
					placeholder={localStorage.getItem("i18nextLng")?.toUpperCase()}
				/>
			</SelectTrigger>
			<SelectContent className="bg-[white]">
				<SelectItem value="uz">UZ</SelectItem>
				<SelectItem value="en">EN</SelectItem>
				<SelectItem value="ru">RU</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default Locale;
