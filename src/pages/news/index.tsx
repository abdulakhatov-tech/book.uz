import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import NewsComponent from "@/components/views/news";

const NewsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Latest News - Book Shop</title>
				<meta name="description" content="Stay updated with the latest news, book releases, and events at Book Shop." />
				<meta name="keywords" content="news, book releases, events, book shop, updates" />
				<link rel="canonical" href="/news" />
			</Helmet>
			<NewsComponent />
		</>
	);
};

export default NewsPage;
