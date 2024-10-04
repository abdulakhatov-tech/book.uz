import { FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

interface CustomPaginationProps {
  currentPage: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({ currentPage = 1 }) => {
  const [_, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    // Update the URL with the new page
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams.toString());
      updatedParams.set("page", newPage.toString());
      return updatedParams;
    });
  };

  return (
    <Pagination className='mt-8'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
            }
          />
        </PaginationItem>
        {[...Array(3)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
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
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
