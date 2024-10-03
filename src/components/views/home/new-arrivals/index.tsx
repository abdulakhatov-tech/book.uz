import React from "react";
import { useTranslation } from "react-i18next";

import useSectionLazyLoader from "../../../../services/section-lazy-loader";
import ProductsCarousel from "@/components/common/products-carousel";

const NewArrivals: React.FC = () => {
	const { t } = useTranslation();
	const { newArrivalBooks, newArrivalBooksRef } = useSectionLazyLoader();

	return (
		<ProductsCarousel
			title={t("home.new_arrivals.title")}
			booksRef={newArrivalBooksRef}
			books={newArrivalBooks}
		/>
	);
};

export default NewArrivals;
