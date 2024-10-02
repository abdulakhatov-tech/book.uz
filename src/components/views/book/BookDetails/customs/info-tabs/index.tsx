import classNames from "classnames";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { BookI } from "@/types";
import useBookDetailsFeatures from "../../features";

const InfoTabs: FC = () => {
  const { t } = useTranslation();
  const { loading, book }: { loading: boolean; book: BookI } =
    useBookDetailsFeatures();

  const [activeTab, setActiveTab] = useState<"information" | "comments" | "quote">("information");

  const tabItems = [
    { key: "information", label: t("book.information") },
    { key: "comments", label: t("book.comments") },
    { key: "quote", label: t("book.quote") },
  ] as const;

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className={`w-[${(100 - (idx * 10))}%] h-[20px] bg-skeleton-color`} />
          ))}
        </div>
      );
    }

    let content = "";
    switch (activeTab) {
      case "information":
        content = book?.description || t("book.no_information");
        break;
      case "comments":
        content = !book?.description?.length ? book.description : t("book.no_comments");
        break;
      case "quote":
        content = !book?.description?.length ? book.description : t("book.no_quotes");
        break;
      default:
        break;
    }

    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className='text-[14px] md:text-[16px] leading-[24px] font-medium text-secondary-black'
      />
    );
  };

  return (
    <div className='mt-10'>
      <div className='flex items-center gap-2 flex-wrap'>
        {tabItems.map(({ key, label }) => (
          <Button
            key={key}
            onClick={() => setActiveTab(key)}
            className={classNames(
              "bg-orange hover:bg-orange text-white hover:text-white",
              {
                "font-bold": activeTab === key,
                "bg-white border text-orange border-orange": activeTab !== key,
              }
            )}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className='w-full py-4 md:py-5 px-5 md:px-6 rounded-[16px] bg-secondary-gray mt-4'>
        <h4 className='text-[20px] md:text-[24px] font-bold leading-[33.6px] text-secondary-black mb-3'>
          {t(`book.${activeTab}`)}
        </h4>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default InfoTabs;
