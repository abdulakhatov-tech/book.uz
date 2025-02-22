import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { BookI } from "@/types";
import Section from "@/layout/section";
import { ProductCard } from "@/generic";
import Container from "@/layout/container";
import useNewAgeLibraryFeatures from "./features";
import MoreBooksButton from "@/components/common/more-books";
import BookSkeleton from "@/components/common/product-card-skeleton";

const BOOK_DISPLAY_LIMIT = 11;
const SKELETON_COUNT = 12;

const NewAgeLibrary: FC = () => {
	const { t } = useTranslation();
	const {
		books,
		loading,
		booksCount,
		handleMoreBooks,
		handleLessBooks,
		newAgeLibraryBooksRef,
	} = useNewAgeLibraryFeatures();

	const hasBooks = books && books.length > 0;
	const showLessBooksButton = booksCount > BOOK_DISPLAY_LIMIT;
	const showMoreBooksControls = hasBooks && books.length > BOOK_DISPLAY_LIMIT;

	return (
		<Section
			id="new-age-library"
			className="bg-[#F0F0F0] py-[30px] md:py-[35px] lg:py-[40px]"
			ref={newAgeLibraryBooksRef}
			data-section="new-age-library"
		>
			<Container>
				<Button className="bg-orange hover:bg-orange mb-6 md:mb-8">
					{t("home.new_age_library.title")}
				</Button>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:3 md:gap-4">
					{loading
						? Array.from({ length: SKELETON_COUNT }, (_, idx) => (
								<BookSkeleton key={idx} />
							))
						: books?.map((book: BookI) => (
								<ProductCard key={book._id} book={book} />
							))}
				</div>

				{showMoreBooksControls && (
					<div className="flex justify-center mt-8 gap-4">
						<MoreBooksButton onClick={handleMoreBooks} />
						{showLessBooksButton && (
							<MoreBooksButton
								title={t("home.new_age_library.less_books")}
								onClick={handleLessBooks}
							/>
						)}
					</div>
				)}
			</Container>
		</Section>
	);
};

export default NewAgeLibrary;
