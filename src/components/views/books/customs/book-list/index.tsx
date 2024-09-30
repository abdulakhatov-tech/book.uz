import BookSkeleton from "@/components/common/product-card-skeleton";
import { ProductCard } from "@/generic";
import { useAppSelector } from "@/hooks/useRedux";
import useSearchParamsHook from "@/hooks/useSearchParams";
import useBooksService from "@/services/books";
import { BookI } from "@/types";
import type { FC } from "react";

const Aside: FC = () => {
  const { getParam } = useSearchParamsHook()
  const {getAllBooks} = useBooksService();
  const { limit } = useAppSelector(state => state.columnCounter)

  const { isLoading, isError, data } = getAllBooks;

  const loading = isLoading || isError




  return <div className={`grid grid-cols-${limit} gap-${limit === 3 ? 6 : limit === 4 ? 5 : 3}`}>
    { loading ? Array.from({length: +(getParam('limit') as string)}).map((_: any, idx: number) => <BookSkeleton key={idx} />)
    :  data?.map((book: BookI) => (
        <ProductCard key={book._id} {...book} />
      ))
    }
  </div>;
};

export default Aside;
