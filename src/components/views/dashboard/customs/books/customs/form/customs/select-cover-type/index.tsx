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
import { CoverTypeI, SelectCoverPropsI } from "./interface";

const SelectCoverType: React.FC<SelectCoverPropsI> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { bookCoverTypes } = MockData();

  return (
    <Select value={value} onValueChange={(value) => onChange(value, "cover")}>
      <SelectTrigger>
        <SelectValue placeholder={t("dashboard.books.select_cover_type")} />
      </SelectTrigger>
      <SelectContent className='max-h-[400px]'>
        {bookCoverTypes?.map((cover: CoverTypeI) => (
          <SelectItem value={cover.value!} key={cover.value}>
            {cover.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCoverType;
