import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useOutlet } from "react-router-dom";

import { AuthorI } from "@/types";
import Section from "@/layout/section";
import Container from "@/layout/container";
import useAuthorsFeatures from "./features";
import SearchBar from "@/tools/search-bar";
import booksIcon from "@/assets/icons/books.svg";
import CustomPagination from "@/tools/pagination";
import noAuthor from "@/assets/icons/no-user.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewCounter } from "../books/customs/toolbar/customs";

const AuthorsComponent: FC = () => {
	const hasOutlet = useOutlet();
	const { t } = useTranslation();

	const { loading, authors, currentPage } = useAuthorsFeatures();

	return (
		<>
			{!hasOutlet ? (
				<Section id="authors" className="pt-4 pb-14 md:pb-16">
					<Container>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-[34.13px] text-black ">
								{t("books.authors")}
							</h3>
							<SearchBar />
							<ViewCounter />
						</div>
						<ul className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
							{!loading
								? authors?.map((author: AuthorI) => (
										<Link to={`/authors/details/${author?._id}`}>
											<li className="bg-secondary-gray px-6 md:px-8 py-4 md:py-6 rounded-[8px] flex gap-6">
												<div className="w-full max-w-[100px] max-h-[100px] rounded-full overflow-hidden">
													<img
														src={author?.imgUrl || noAuthor}
														alt={author?.fullName || "author"}
														loading="lazy"
														className="w-full h-full object-cover"
													/>
												</div>

												<div>
													{loading ? (
														<Skeleton className="w-[70%] h-[35px] sm:h-[40px] bg-skeleton-color" />
													) : (
														<h2 className="text-[20px] md:text-[22px] font-bold text-secondary-black truncate-two-lines">
															{author?.fullName}
														</h2>
													)}
													<Link
														to={`/books?page=1&limit=24&authorIds=${author?._id}`}
														className="flex items-center gap-2 underline"
													>
														<img src={booksIcon} alt="books" />
														<h4 className="text-[16px] md:text-[18px] font-bold text-secondary-black flex items-center gap-2">
															{loading ? (
																<Skeleton className="w-[30px] h-[25px] bg-skeleton-color" />
															) : (
																`${author?.bookCount} ${t(
																	author?.bookCount > 1
																		? "authors.books"
																		: "authors.book",
																)}`
															)}
														</h4>
													</Link>
												</div>
											</li>
										</Link>
									))
								: Array.from({ length: 12 }).map((_: any, idx: number) => (
										<li
											key={idx}
											className="bg-secondary-gray px-6 md:px-8 py-4 md:py-6 rounded-[8px] flex gap-4"
										>
											<Skeleton className="w-[100px] h-[100px] rounded-full bg-skeleton-color" />
											<div className="flex flex-col gap-2 flex-1">
												<Skeleton className="w-full h-[18px] sm:h-[20px] bg-skeleton-color" />
												<Skeleton className="w-[180px] h-[18px] sm:h-[20px] bg-skeleton-color" />
												<Skeleton className="w-[150px] h-[16px] sm:h-[18px] bg-skeleton-color" />
											</div>
										</li>
									))}
						</ul>
						{authors?.length > 12 && (
							<CustomPagination currentPage={currentPage} />
						)}
					</Container>
				</Section>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default AuthorsComponent;
