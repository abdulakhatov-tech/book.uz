import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import MoreBooks from "@/components/common/more-books";

import { BookI } from "@/types";
import Section from "@/layout/section";
import { ProductCard } from "@/generic";
import Container from "@/layout/container";
import useNewAgeLibraryFeatures from "./features";

const NewAgeLibrary: React.FC = () => {
	const { t } = useTranslation();
	const { books, loading, booksCount, handleMoreBooks, handleLessBooks } =
		useNewAgeLibraryFeatures();

	return (
		<Section id="new-age-library" className="bg-[#F0F0F0] py-[40px]">
			<Container>
				<Button className="bg-orange hover:bg-orange mb-8">
					{t("home.new_age_library.title")}
				</Button>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:3 md:gap-4">
					{loading
						? Array.from({ length: 12 }).map((_, idx) => (
								<div key={idx} className="flex flex-col gap-2">
									<Skeleton className="h-[200px] md:h-[235px] bg-white" />
									<div className="flex flex-col gap-2">
										<Skeleton className="w-[90%] h-[20px] bg-white" />
										<Skeleton className="w-[80%] h-[20px] bg-white" />
										<Skeleton className="w-[70%] h-[20px] bg-white" />
									</div>
								</div>
							))
						: books?.map((book: BookI) => (
								<ProductCard key={book._id} {...book} />
							))}
				</div>

				{/* Conditionally render buttons only if there are more than 11 books */}
				{books.length > 11 && (
					<div className="flex justify-center mt-8 gap-4">
						<MoreBooks onClick={handleMoreBooks} />
						{booksCount > 11 && (
							<MoreBooks title="Less books" onClick={handleLessBooks} />
						)}
					</div>
				)}
			</Container>
		</Section>
	);
};

export default NewAgeLibrary;
