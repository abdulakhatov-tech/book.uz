import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: FC = () => {
	const { t } = useTranslation();

	return Array.from({ length: 7 }).map((_: any, idx: number) => (
		<div key={idx} className="py-5 px-4 bg-[#F6F6F6] rounded-[8px]">
			<div className="flex items-center justify-between gap-4">
				<h3 className="text-[18px] font-semibold leading-[21.78px] text-secondary-black">
					{t("profile.orders.order")} № {idx + 1}
				</h3>
				<Skeleton className="w-[100px] h-[20px] bg-skeleton-color" />
			</div>
			<div className="mt-6 flex items-center justify-between gap-4">
				<Skeleton className="w-[100px] h-[30px] bg-skeleton-color" />
				<Skeleton className="w-[100px] h-[20px] bg-skeleton-color" />
			</div>
		</div>
	));
};

export default LoadingSkeleton;
