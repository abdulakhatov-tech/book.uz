import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { NewsI } from "@/types";
import Section from "@/layout/section";
import Container from "@/layout/container";
// import useNewsService from "@/services/news";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton, NewsItem } from "./customs";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useSectionLazyLoader from "../../../../services/section-lazy-loader";

const News: FC = () => {
	const { t } = useTranslation();
	const isOnline = useOnlineStatus();
	// const { allNews } = useNewsService();
	const { allNews, newsRef } = useSectionLazyLoader();
	const { isLoading, isError, data: newsData } = allNews;

	const loading = isLoading || !isOnline;

	if (isError) {
		return (
			<Section id="news" className="py-[30px] md:py-[35px] lg:py-[40px]">
				<Container>
					<p className="text-red-500">{t("errors.general")}</p>
				</Container>
			</Section>
		);
	}

	return (
		<Section
			id="news"
			ref={newsRef}
			data-section="news"
			className="py-[30px] md:py-[35px] lg:py-[40px]"
		>
			<Container>
				<div className="flex items-center justify-between">
					<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[34.13px] text-black">
						{t("home.news.title")}
					</h3>
					<Link to="/news?page=1&limit=12">
						<Button className="bg-orange hover:bg-orange">
							{t("home.news.title")}
						</Button>
					</Link>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-[15px] sm:pt-[20px] md:pt-[24px]">
					{loading ? (
						<LoadingSkeleton />
					) : (
						newsData
							?.reverse()
							?.slice(0, 4)
							.map((news: NewsI) => <NewsItem key={news._id} {...news} />)
					)}
				</div>
			</Container>
		</Section>
	);
};

export default News;
