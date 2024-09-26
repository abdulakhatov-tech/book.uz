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
import { BookStateI, SelectBookStatePropsI } from "./interface";

const SelectBookState: React.FC<SelectBookStatePropsI> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();
  const { bookStates } = MockData();

  return (
    <Select value={value} onValueChange={(value) => onChange(value, "state")}>
      <SelectTrigger>
        <SelectValue placeholder={t("dashboard.books.select_author")} />
      </SelectTrigger>
      <SelectContent className='max-h-[400px]'>
        {bookStates?.map((state: BookStateI) => (
          <SelectItem value={state.value!} key={state.value}>
            {state.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBookState;
