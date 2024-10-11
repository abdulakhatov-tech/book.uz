import { FC } from "react";
import { Helmet } from "react-helmet-async";
import AuthorDetailsComponent from "@/components/views/authors/author-details";

const AuthorDetailsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Author Details - Book Shop</title>
				<meta name="description" content="Discover details about this author, their works, and contributions to literature." />
				<meta name="keywords" content="author, book, literature, biography" />
				<link rel="canonical" href="/authors/author-details" />
			</Helmet>
			<AuthorDetailsComponent />
		</>
	);
};

export default AuthorDetailsPage;
