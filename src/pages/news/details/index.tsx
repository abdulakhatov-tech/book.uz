import NewsDetailsComponent from "@/components/views/news/details";
import { FC } from "react";
import { Helmet } from "react-helmet-async";

const NewsDetailsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>News Details - Book Shop</title>
				<meta name="description" content="Read the full details about the latest news, updates, and events at Book Shop." />
				<meta name="keywords" content="news, book updates, events, details, book shop" />
				<link rel="canonical" href="/news/details" />
			</Helmet>
			<NewsDetailsComponent />
		</>
	);
};

export default NewsDetailsPage;
