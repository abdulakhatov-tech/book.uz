import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLocalFeatures = () => {
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

	const lang = localStorage.getItem("i18nextLng");
	const capitalizedLang = lang
		? lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
		: null;
	return {
		onLanguageHandler,
		capitalizedLang,
	};
};

export default useLocalFeatures;
