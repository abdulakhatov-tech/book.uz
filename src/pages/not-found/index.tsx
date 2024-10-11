import NotFoundComponent from "@/components/views/not-found";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const NotFoundPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Page Not Found - Book Shop</title>
				<meta name="description" content="Sorry, the page you are looking for does not exist. Please check the URL or go back to the homepage." />
				<meta name="keywords" content="404, page not found, error, book shop, not found" />
				<link rel="canonical" href="/404" />
			</Helmet>
			<NotFoundComponent />
		</>
	);
};

export default NotFoundPage;
