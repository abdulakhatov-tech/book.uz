import Books from "@/components/views/books";
import type { FC } from "react";
import { Outlet, useOutlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BooksPage: FC = () => {
	const hasOutlet = useOutlet();

	return (
		<>
			<Helmet>
				{!hasOutlet ? (
					<>
						<title>Books Collection - Book Shop</title>
						<meta name="description" content="Explore our wide collection of books. Find your next read from various genres and authors." />
						<meta name="keywords" content="books, book shop, literature, genres, authors" />
						<link rel="canonical" href="/books" />
					</>
				) : (
					// Optionally handle child routes' SEO here if needed
					<title>Book Details - Book Shop</title>
				)}
			</Helmet>
			<div>{hasOutlet ? <Outlet /> : <Books />}</div>
		</>
	);
};

export default BooksPage;
