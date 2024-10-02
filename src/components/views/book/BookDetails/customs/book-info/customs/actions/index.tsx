import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useBookDetailsFeatures from "../../../../features";

const Actions: FC = () => {
	const { t } = useTranslation();
	const { loading } = useBookDetailsFeatures();

	if (loading) {
		return (
			<div className="mt-6 md:mt-8 flex items-center gap-2 flex-wrap">
				<Skeleton className="bg-skeleton-color w-[200px] h-[35px] md:h-[40px]" />
				<Skeleton className="bg-skeleton-color w-[170px] h-[35px] md:h-[40px]" />
				<Skeleton className="bg-skeleton-color w-[50px] h-[35px] md:h-[40px]" />
			</div>
		);
	}

	return (
		<div className="mt-6 md:mt-8 flex items-center gap-2 flex-wrap">
			<Button
				className="bg-orange hover:bg-orange flex items-center gap-2 text-[14px] md:text-[16px] font-medium leading-[24px] text-white"
				aria-label={t("book.add_to_cart")}
			>
				<FaShoppingBasket className="text-[18px]" />
				{t("book.add_to_cart")}
			</Button>

			<Button
				variant="outline"
				className="border-orange bg-white hover:text-orange text-orange text-[14px] md:text-[16px] font-medium leading-[24px]"
				aria-label={t("book.quick_buy")}
			>
				{t("book.quick_buy")}
			</Button>

			<Button
				variant="default"
				className="border-orange bg-orange hover:bg-orange"
				aria-label={t("book.add_to_wishlist")}
			>
				<IoMdHeartEmpty className="text-[22px] md:text-[24px] text-white" />
			</Button>
		</div>
	);
};

export default Actions;
