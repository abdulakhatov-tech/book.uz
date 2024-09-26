import React from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MockData } from "@/utils";
import { LanguageI, SelectLanguagePropsI } from "./interface";

const SelectLanguage: React.FC<SelectLanguagePropsI> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();
  const { bookLanguages } = MockData();

  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value, "language")}
    >
      <SelectTrigger>
        <SelectValue placeholder={t("dashboard.books.select_language")} />
      </SelectTrigger>
      <SelectContent className='max-h-[400px]'>
        {bookLanguages?.map((language: LanguageI) => (
          <SelectItem value={language.value!} key={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
