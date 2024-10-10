import { FC, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/layout/container";
import Section from "@/layout/section";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";

import useBooksService from "@/services/books";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import LoadingSpinner from "@/tools/loading-spinner";
import { BookI } from "@/types";
import { formatPrice } from "@/helpers";
import { useAppSelector } from "@/hooks/useRedux";
import classNames from "classnames";

const SearchComponent: FC = () => {
  const isOnline = useOnlineStatus();
  const { open } = useAppSelector(state => state.search)
  const { useGetAllBooks } = useBooksService();
  const [search, setSearch] = useState<string>("");

  // Handle user input and update search state
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const { isLoading, isError, data } = useGetAllBooks({
    search,
  });

  const loading = isLoading || isError || !isOnline;
  const hasData = data && data.length > 0;

  return (
    <Section id='search' className={classNames('py-4', {
      "hidden": !open,
      "block": open
    })}>
      <Container>
        <Popover open={hasData && search.length > 0}>
          <PopoverTrigger className='w-full'>
            <Input
              placeholder='Search...'
              onChange={handleInputChange}
              aria-label='Search books'
              className='mx-w-[300px] md:max-w-[400px] mx-auto'
            />
          </PopoverTrigger>
          <PopoverContent className='w-full md:w-[450px] max-w-md mx-auto'>
            {!loading ? (
              hasData ? (
                <div className='space-y-2 py-4'>
                  {data.slice(0, 4).map((book: BookI) => (
                    <Link to={`/books/details/${book?._id}`} key={book._id}>
                      <div className='px-4 py-2 hover:bg-gray-200 flex gap-4'>
                        <img
                          src={book?.imgUrl}
                          alt={book?.name}
                          loading='lazy'
                          className='w-[50px] h-[70px] object-cover'
                        />
                        <div className='w-full'>
                          <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[18px] font-semibold'>
                              {book?.name}
                            </h4>
                            <span>{formatPrice(book?.bookPrice)}</span>
                          </div>
                          <Link
                            to={`/authors/details/${book?.author?._id}`}
                            className='text-[16px] font-semibold text-gray'
                          >
                            {book?.author?.fullName}
                          </Link>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className='text-center py-4'>No results found.</div>
              )
            ) : (
              <div className='w-full flex items-center py-4'>
                <LoadingSpinner className='text-[24px] mx-auto' />
              </div>
            )}
          </PopoverContent>
        </Popover>
      </Container>
    </Section>
  );
};

export default SearchComponent;
