import type { FC } from "react";
import { useTranslation } from "react-i18next";

import Section from "@/layout/section";
import { ColumnCounter, Sort, ViewCounter } from "./customs";

const Toolbar: FC = () => {
  const { t } = useTranslation();


  return     <Section id='books-header' className="flex items-center justify-between">
      <h2 className="text-[28px] font-semibold leading-[34.13px] text-secondary-black">{t('books.title')}</h2>
      <div className="flex items-center gap-4">
        <ViewCounter />
        <ColumnCounter/>
        <Sort />
      </div>
    </Section>
};

export default Toolbar;
