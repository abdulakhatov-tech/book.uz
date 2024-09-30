import type { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import useSearchParamsHook from "@/hooks/useSearchParams";

const VIEW_OPTIONS = [9, 24, 36]; 

const ViewCounter: FC = () => {
  const { t } = useTranslation();
  const { setParam, getParam } = useSearchParamsHook();

  const activeCount = +(getParam("limit") as string) || 24;

  const handleViewCount = (count: number) => {
    if (count !== activeCount) {
      setParam("limit", count.toString());
    }
  };

  return (
    <div className="hidden md:flex items-center gap-2">
      <h4 className="text-[14px] font-medium leading-[16.94px] text-[#565656]">
        {t("books.show")}:
      </h4>
      <ul className="flex items-center gap-2">
        {VIEW_OPTIONS.map((count) => (
          <li
            key={count}
            onClick={() => handleViewCount(count)}
            className={classNames(
              "center w-[29px] h-[29px] rounded-[4px] text-[14px] font-semibold leading-[16.94px] cursor-pointer",
              {
                "bg-secondary-blue text-blue": activeCount === count,
                "bg-[#F6F6F6] text-[#565656]": activeCount !== count,
              }
            )}
          >
            {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCounter;
