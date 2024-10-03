import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import Section from "@/layout/section";
import Container from "@/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import noAuthor from "@/assets/icons/no-user.svg";
import booksIcon from "@/assets/icons/books.svg";

import useBooksService from "@/services/books";
import useAuthorsService from "@/services/authors";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import ProductsCarousel from "@/components/common/products-carousel";

const AuthorDetailsComponent: FC = () => {
	const { t } = useTranslation();
	const { authorId } = useParams();
	const isOnline = useOnlineStatus();
	const { useGetAuthorById } = useAuthorsService();
	const { data: author, isLoading, isError } = useGetAuthorById(authorId!);

	const { useGetAllBooks } = useBooksService();
	const authorBooks = useGetAllBooks({ authorIds: authorId });

	const loading = isLoading || isError || !isOnline;
	const {
		imgUrl,
		fullName,
		_id: authorIdFetched,
		biography,
		bookCount,
	} = author || {};

	const renderAuthorImage = () => {
		return loading ? (
			<Skeleton className="aspect-[1/1] max-w-[250px] sm:max-w-[300px] max-h-[250px] sm:max-h-[300px] w-full h-full rounded-full bg-skeleton-color" />
		) : (
			<AvatarImage
				src={imgUrl || noAuthor}
				className="aspect-[1/1] max-w-[250px] sm:max-w-[300px] max-h-[250px] sm:max-h-[300px] w-full h-full rounded-full object-cover"
			/>
		);
	};

	const renderAuthorName = () => {
		return loading ? (
			<Skeleton className="w-[70%] h-[35px] sm:h-[40px] bg-skeleton-color" />
		) : (
			<h1 className="text-[28px] md:text-[34px] font-bold text-secondary-black">
				{fullName}
			</h1>
		);
	};

	const renderBooksLink = () => {
		return (
			<Link
				to={`/books?page=1&limit=24&authorIds=${authorIdFetched}`}
				className="flex items-center gap-2 mt-4 underline"
			>
				<img src={booksIcon} alt="books" />
				<h4 className="text-[16px] md:text-[18px] font-bold text-secondary-black flex items-center gap-2">
					{loading ? (
						<Skeleton className="w-[30px] h-[25px] bg-skeleton-color" />
					) : (
						`${bookCount} ${t(bookCount > 1 ? "authors.books" : "authors.book")}`
					)}
				</h4>
			</Link>
		);
	};

	const renderBiography = () => {
		if (loading) {
			return (
				<div className="flex flex-col gap-2">
					{[100, 95, 90, 85, 80, 75].map((width) => (
						<Skeleton
							key={width}
							className={`w-[${width}%] h-[20px] bg-skeleton-color`}
						/>
					))}
				</div>
			);
		}
		return (
			<div
				className="text-[14px] md:text-[16px] leading-[24px] font-medium text-secondary-black"
				dangerouslySetInnerHTML={{
					__html: biography || t("authors.no_biography"),
				}}
			/>
		);
	};

	return (
		<Section id="author-details" className="py-4">
			<Container>
				<div className="grid md:grid-cols-[1fr_1.7fr] gap-6 w-full mb-8">
					<Avatar className="w-full h-full flex flex-col items-center justify-center">
						{renderAuthorImage()}
					</Avatar>

					<div className="mt-4">
						{renderAuthorName()}
						{renderBooksLink()}

						<div className="w-full py-4 md:py-5 px-5 md:px-6 rounded-[16px] bg-secondary-gray mt-4">
							<h4 className="text-[20px] md:text-[24px] font-bold leading-[33.6px] text-secondary-black mb-3">
								{t("authors.biography")}
							</h4>
							{renderBiography()}
						</div>
					</div>
				</div>

				<ProductsCarousel
					title={t("authors.author_books")}
					books={authorBooks}
					className="bg-white py-4"
				/>
			</Container>
		</Section>
	);
};

export default AuthorDetailsComponent;
