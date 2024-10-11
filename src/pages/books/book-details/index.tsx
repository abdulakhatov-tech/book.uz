import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import Book from "@/components/views/book";

const BookDetailsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Book Details - Book Shop</title>
				<meta name="description" content="Discover more details about this book, including the author, genre, and reviews." />
				<meta name="keywords" content="book details, author, genre, reviews, book shop" />
				<link rel="canonical" href="/book-details" />
			</Helmet>
			<Book />
		</>
	);
};

export default BookDetailsPage;
