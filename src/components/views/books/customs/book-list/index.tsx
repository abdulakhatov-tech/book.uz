import { useEffect, useState, type FC } from "react";
import { useSearchParams } from "react-router-dom";

import { BookI } from "@/types";
import { ProductCard } from "@/generic";
import useBooksService from "@/services/books";
import { useAppSelector } from "@/hooks/useRedux";
import BookSkeleton from "@/components/common/product-card-skeleton";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface QueryParams {
  page: number;
  limit?: number;
  fromPrice?: number;
  toPrice?: number;
  asc?: number;
  [key: string]: any; // Allow other keys as well
}

const Main: FC = () => {
  const { useGetAllBooks } = useBooksService();
  const { limit } = useAppSelector((state) => state.columnCounter);
  const [queryParams, setQueryParams] = useState<QueryParams>({ page: 1 });
  const [searchParams, setSearchParams] = useSearchParams(); // use this to update the URL
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetching books using the state queryParams
  const { isLoading, isError, data } = useGetAllBooks(queryParams);

  const loading = isLoading || isError;

  useEffect(() => {
    // Convert searchParams to a plain object
    const params: QueryParams = { page: 1 }; // Ensure page is always set
    searchParams.forEach((value, key) => {
      if (["page", "limit", "fromPrice", "toPrice", "asc"].includes(key)) {
        params[key] = Number(value);
      } else {
        params[key] = value;
      }
    });

    // Set the state and query params
    const pageParam = searchParams.get("page");
    const newPage = pageParam ? Number(pageParam) : 1;
    setCurrentPage(newPage);
    setQueryParams(params);

    console.log(params, "params");
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    // Update the URL with the new page
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams.toString());
      updatedParams.set("page", newPage.toString());
      return updatedParams;
    });
  };

  return (
    <div>
      <div
        className={`grid grid-cols-${limit} gap-${
          limit === 3 ? 6 : limit === 4 ? 5 : 3
        }`}
      >
        {loading
          ? Array.from({ length: limit ?? 10 }).map((_, idx: number) => (
              <BookSkeleton key={idx} />
            ))
          : data?.map((book: BookI) => (
              <ProductCard key={book._id} {...book} />
            ))}
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
            />
          </PaginationItem>
          {[...Array(3)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Main;
