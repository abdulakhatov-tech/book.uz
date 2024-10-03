import { FC } from "react";
import { useTranslation } from "react-i18next";

import useBooksService from "@/services/books";
import useBookDetailsFeatures from "../BookDetails/features";
import ProductsCarousel from "@/components/common/products-carousel";

const SimilarBooks: FC = () => {
	const { t } = useTranslation();
	const { book } = useBookDetailsFeatures();
	const { useGetAllBooks } = useBooksService();

	const similarBooks = useGetAllBooks({ genreIds: book?.genre?._id });

	return (
		<ProductsCarousel
			title={t("book.similar_books")}
			books={similarBooks}
			className="bg-white py-4"
		/>
	);
};

export default SimilarBooks;
