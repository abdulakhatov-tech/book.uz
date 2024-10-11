import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import BookMarkComponent from "@/components/views/bookmark";

const BookmarkPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Bookmarked Books - Book Shop</title>
				<meta name="description" content="View your bookmarked books and easily access your favorite titles." />
				<meta name="keywords" content="bookmarked books, favorites, book collection, book shop" />
				<link rel="canonical" href="/bookmark" />
			</Helmet>
			<BookMarkComponent />
		</>
	);
};

export default BookmarkPage;
