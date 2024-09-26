import React from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { AuthorI } from "@/types";
import { SelectAuthorPropsI } from "./interface";
import useAuthorsService from "@/services/authors";

const SelectAuthor: React.FC<SelectAuthorPropsI> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { getAllAuthors } = useAuthorsService();

  const { isLoading, isError, data: authors } = getAllAuthors;

  return (
    <Select value={value} onValueChange={(value) => onChange(value, "author")}>
      <SelectTrigger>
        <SelectValue placeholder={t("dashboard.books.select_author")} />
      </SelectTrigger>
      <SelectContent className='max-h-[400px]'>
        {isLoading || isError
          ? Array.from({ length: 10 }).map((_: any, idx: number) => (
              <Skeleton key={idx} className='w-full h-[30px] mb-1' />
            ))
          : authors?.map((author: AuthorI) => (
              <SelectItem value={author._id!} key={author._id}>
                {author.fullName}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  );
};

export default SelectAuthor;
