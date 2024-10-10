import { formatDate } from "@/helpers";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useNewsService from "@/services/news";
import { FC } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { useParams } from "react-router-dom";

const NewsDetailsComponent: FC = () => {
	const { newsId } = useParams();
	const isOnline = useOnlineStatus();

	const { useGetNewsById } = useNewsService();

	const { isLoading, isError, data: news } = useGetNewsById(newsId!);

	const laoding = isLoading || isError || !isOnline;

	return (
		<div className="max-w-[1000px] mx-auto">
			<h2 className="text-[26px] font-bold text-secondary-black">
				{news?.title}
			</h2>
			<div className="flex items-center gap-2 mt-2">
				<MdOutlineDateRange className="text-[20px] text-gray" />
				<span className="text-[16px] font-semibold text-gray">
					{" "}
					{formatDate(news?.createdAt)}
				</span>
			</div>

			<div className="mt-6 rounded-xl overflow-hidden lg:h-[600px] max-w-full">
				<img
					src={news?.imgUrl}
					alt={news?.title}
					loading="lazy"
					className="w-full h-full object-contain"
				/>
			</div>
			<p
				className="mt-4 text-[16px] font-semibold text-secondary-black"
				dangerouslySetInnerHTML={{
					__html: news?.content || "No content available",
				}}
			/>
		</div>
	);
};

export default NewsDetailsComponent;
