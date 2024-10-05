import { FC } from "react";
import { useTranslation } from "react-i18next";

import useBooksService from "@/services/books";
import ProductsCarousel from "@/components/common/products-carousel";

const RecommendedBooks: FC = () => {
	const { t } = useTranslation();
	const { useGetAllBooks } = useBooksService();

	const recommendedBooks = useGetAllBooks();

	return (
		<ProductsCarousel
			title={t("cart.recommended")}
			books={recommendedBooks}
			className="bg-white py-4 mt-8 md:mt-16"
		/>
	);
};

export default RecommendedBooks;
