import AuthorsComponent from "@/components/views/authors";
import { Helmet } from "react-helmet-async";
import type { FC } from "react";

const AuthosPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Authors - Book Shop</title>
				<meta name="description" content="Explore the list of authors in our collection. Find your favorite authors and their works." />
				<meta name="keywords" content="authors, books, literature, book shop" />
				<link rel="canonical" href="/authors" />
			</Helmet>
			<AuthorsComponent />
		</>
	);
};

export default AuthosPage;
