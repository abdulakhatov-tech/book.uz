import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { NewsI } from "@/types";
import { MockData } from "@/utils";
import Section from "@/layout/section";
import useNewsFeatures from "./features";
import Container from "@/layout/container";
import CustomPagination from "@/tools/pagination";
import { ViewCounter } from "../books/customs/toolbar/customs";
import { LoadingSkeleton, NewsItem } from "../home/news/customs";

const NewsComponent: FC = () => {
	const { t } = useTranslation();
	const { newsfilterOptions } = MockData();
	const { loading, newsData, currentPage, queryParams, handleChange } =
		useNewsFeatures();

	const renderNewsItems = () => {
		if (loading) {
			return <LoadingSkeleton />;
		}

		if (newsData?.length) {
			return newsData.map((news: NewsI) => (
				<NewsItem key={news._id} {...news} />
			));
		}

		return (
			<h4 className="text-[16px] font-semibold text-black text-center py-6 w-full col-span-4">
				{t("news.no_news")}
			</h4>
		);
	};

	return (
		<Section id="bookmark" className="pt-4 pb-[80px] md:pb-[100px]">
			<Container>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-[34.13px] text-black">
						{t("news.title")}
					</h3>
					<div className="flex items-center gap-4">
						<ViewCounter viewOptions={[12, 16, 24]} />

						<Select
							// defaultValue={queryParams?.type}
							value={queryParams.type}
							onValueChange={handleChange}
						>
							<SelectTrigger className="w-[140px]">
								<SelectValue placeholder={t("news.sort_by")} />
							</SelectTrigger>
							<SelectContent>
								{newsfilterOptions?.map(
									({ label, value }: { label: string; value: string }) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									),
								)}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-[15px] sm:pt-[20px] md:pt-[24px]">
					{renderNewsItems()}
				</div>

				{newsData?.length > 12 && (
					<CustomPagination currentPage={currentPage} />
				)}
			</Container>
		</Section>
	);
};

export default NewsComponent;
