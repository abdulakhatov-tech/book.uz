import { type FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { MockData } from "@/utils";
import useLanguagesFeatures from "./features";

const Languages: FC = () => {
  const { t } = useTranslation();
  const { bookLanguages } = MockData();
  const { handleLanguageChange, lang } = useLanguagesFeatures();

  return (
    <div className='bg-secondary-gray py-[18px] px-4 rounded-[8px] flex flex-col gap-4'>
      <h4 className='text-[16px] font-semibold leading-[24px] text-secondary-black'>
        {t("books.languages")}
      </h4>

      <ul className='flex flex-col gap-1'>
        {bookLanguages.map((item: any) => (
          <li
            key={item.value}
            onClick={() => handleLanguageChange(item.value)}
            className={classNames(
              "py-2 px-4 hover:bg-orange hover:text-white active:opacity-75 rounded-md cursor-pointer flex items-center justify-between gap-4",
              {
                "bg-orange text-white": lang === item.value,
              }
            )}
          >
            {item.label}
            {lang === item.value && (
              <div className='w-[18px] h-[18px] rounded-full bg-secondary-gray flex items-center justify-center'>
                <div className='bg-orange w-3 h-3 rounded-full'></div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
