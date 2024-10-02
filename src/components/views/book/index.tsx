import { FC } from "react";
import BookDetails from "./BookDetails";
import AuthorsBooks from "./AuthorsBooks";
import SimilarBooks from "./SimilarBooks";

const Book: FC = () => {
	return (
		<>
			<BookDetails />
			<AuthorsBooks />
			<SimilarBooks />
		</>
	);
};

export default Book;
