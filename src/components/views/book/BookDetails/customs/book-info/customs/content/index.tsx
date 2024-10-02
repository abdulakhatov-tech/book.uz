import { FC } from "react";
import { useTranslation } from "react-i18next";

import { IoMdStar } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";

import { formatPrice } from "@/helpers";
import useBookDetailsFeatures from "../../../../features";

const Content: FC = () => {
	const { t } = useTranslation();
	const { loading, book } = useBookDetailsFeatures();

	return (
		<div>
			{loading ? (
				<Skeleton className="bg-skeleton-color w-[100%] h-[36px] md:h-[40px]" />
			) : (
				<h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold leading-[28px] md:leading-[36.4px] text-secondary-black">
					{book?.name}
				</h2>
			)}

			{loading ? (
				<Skeleton className="bg-skeleton-color w-[90%] md:w-[60%] h-[30px] mt-2 md:mt-4" />
			) : (
				<h4 className="text-[16px] md:text-[18px] font-bold leading-[21.94px] text-blue mt-2 md:mt-4">
					{book?.author?.fullName}
				</h4>
			)}

			{loading ? (
				<div className="mt-2 flex items-center gap-4">
					<Skeleton className="bg-skeleton-color w-[20%] md:w-[10%] h-[25px]" />
					<Skeleton className="bg-skeleton-color w-[30%] md:w-[15%] h-[25px]" />
					<Skeleton className="bg-skeleton-color w-[50%] md:w-[20%] h-[25px]" />
				</div>
			) : (
				<div className="text-[14px] md:text-[16px] font-semibold leading-[19.5px] text-gray flex items-center">
					<IoMdStar className="mr-1 text-orange w-5 h-5" />
					<span className="text-orange mr-1">{book?.rating}</span> (
					{book?.rateCount}{" "}
					{book?.rateCount > 9 ? t("book.people") : t("book.person")}){" "}
					<span className="underline ml-4 cursor-pointer">
						{t("book.comment_on")}
					</span>
				</div>
			)}

			{loading ? (
				<Skeleton className="bg-skeleton-color w-[300px] h-[36px] md:h-[40px] mt-2 md:mt-4" />
			) : (
				<h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold leading-[28px] md:leading-[36.4px] text-orange mt-2 md:mt-4">
					{formatPrice(book?.bookPrice)} {t("book.sum")}
				</h2>
			)}
		</div>
	);
};

export default Content;
