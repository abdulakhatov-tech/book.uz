import type { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLocalFeatures from "./features";

interface LocalePropsI {
  className?: string;
}

const Locale: FC<LocalePropsI> = ({ className }) => {
  const { t } = useTranslation();
  const { onLanguageHandler, capitalizedLang } = useLocalFeatures();

  return (
    <Select onValueChange={(e: string) => onLanguageHandler(e)}>
      <SelectTrigger
        className={`w-[40px] h-fit px-0 py-0 border-none text-[15px] ${className}`}
      >
        <SelectValue placeholder={capitalizedLang} />
      </SelectTrigger>
      <SelectContent className='bg-[white]'>
        <SelectItem value='uz'>{t("header.locale.uz")}</SelectItem>
        <SelectItem value='en'>{t("header.locale.en")}</SelectItem>
        <SelectItem value='ru'>{t("header.locale.ru")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Locale;
