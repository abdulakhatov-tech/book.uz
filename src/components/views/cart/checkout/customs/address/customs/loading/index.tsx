import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading: FC = () => {
	return Array.from({ length: 14 }).map((_: any, idx: number) => (
		<Skeleton key={idx} className="w-full h-[30px] bg-skeleton-color mb-1" />
	));
};

export default Loading;
