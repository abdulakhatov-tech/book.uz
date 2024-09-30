import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSearchParamsHook from "@/hooks/useSearchParams";

const Sort: FC = () => {
  const { t } = useTranslation();
  const { setParam, removeParam, getParam } = useSearchParamsHook();
  const [selectedSort, setSelectedSort] = useState<string>("saralash");

  // Load the current sort value from the URL search parameters
  useEffect(() => {
    const sortBy = getParam("sortBy") as string;
    if (sortBy) {
      setSelectedSort(sortBy);
    }
  }, [getParam]);

  const handleSortChange = (sortText: string) => {
    if (sortText === "saralash") {
      removeParam("sortBy");
    } else {
      setParam("sortBy", sortText);
    }
    setSelectedSort(sortText);
  };

  return (
    <Select onValueChange={handleSortChange} value={selectedSort}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder={t("books.sort_by")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="saralash">{t("books.sort_by")}</SelectItem>
        <SelectItem value="yangi-kitoblar">{t("books.new_books")}</SelectItem>
        <SelectItem value="arzonroq">{t("books.cheaper")}</SelectItem>
        <SelectItem value="qimmatroq">{t("books.more_expensive")}</SelectItem>
        <SelectItem value="reytingi-yuqori">{t("books.reyting")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Sort;
