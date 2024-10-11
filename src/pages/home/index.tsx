import { Home } from "@/components/views";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const HomePage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Welcome to Book Shop</title>
				<meta name="description" content="Explore a wide selection of books at Book Shop. Find your next read from various genres and authors." />
				<meta name="keywords" content="books, online book store, book shop, literature, authors" />
				<link rel="canonical" href="/" />
			</Helmet>
			<Home />
		</>
	);
};

export default HomePage;
