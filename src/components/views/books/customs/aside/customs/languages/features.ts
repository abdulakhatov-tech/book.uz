import useSearchParamsHook from "@/hooks/useSearchParams";
import { useEffect } from "react";

const useLanguagesFeatures = () => {
  const { setParam, getParam, removeParam } = useSearchParamsHook();

  const lang = (getParam("language") as "uz" | "en" | "ru" | "")  || "";

  useEffect(() => {
    if (lang !== 'en' && lang !== "ru" && lang !== "uz") {
      removeParam("language");
    } 
  }, [lang])

  const handleLanguageChange = (selectedLang: "uz" | "en" | "ru") => {
    if (lang === selectedLang) {
      removeParam("language");
      return;
    }

    setParam("language", selectedLang);
  };

  return { handleLanguageChange, lang };
};

export default useLanguagesFeatures;
