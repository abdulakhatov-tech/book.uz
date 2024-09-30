import { useEffect, useState, useMemo, type FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";

import { GenreI } from "@/types";
import { LoadingSkeleton } from "./customs";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useSearchParamsHook from "@/hooks/useSearchParams";
import useSectionLazyLoader from "../../../../../../services/section-lazy-loader";

interface GenresPropsI {
  isBooksPage?: boolean;
  search?: string;
  setSearch?: (value: string) => void;
}

const Genres: FC<GenresPropsI> = ({
  isBooksPage = false,
  search = "",
  setSearch,
}) => {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getParam, setParam, removeParam } = useSearchParamsHook();

  const { genres, genresRef } = useSectionLazyLoader();
  const { isLoading, isError, data: genresData = [] } = genres;

  const [filteredGenres, setFilteredGenres] = useState<GenreI[]>([]);

  const selectedGenreId = (getParam("genreId") as string) || "";

  const loading = useMemo(
    () => !isOnline || isLoading || isError,
    [isOnline, isLoading, isError]
  );

  const searchResults = useMemo(() => {
    if (search.length) {
      return genresData.filter((genre: GenreI) =>
        genre.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return genresData;
  }, [genresData, search]);

  useEffect(() => {
    setFilteredGenres(searchResults);
  }, [searchResults]);

  const onClick = (genreId: string) => {
    if (pathname === "/") {
      navigate(`/books?page=1&limit=24&genreId=${genreId}`);
      return;
    }

    if (genreId === selectedGenreId) {
      removeParam("genreId");
    } else {
      setParam("genreId", genreId);
    }

    // Clear the search input if search exists
    if (search && setSearch) {
      setSearch("");
    }
  };

  return (
    <div
      ref={genresRef}
      data-section='genres'
      className={classNames({
        "w-full": isBooksPage,
        "hidden lg:block min-w-[287px] max-w-[287px] w-[287px] bg-[#F6F6F6] rounded-[8px] p-2":
          !isBooksPage,
      })}
    >
      <ul
        className={classNames(
          "flex flex-col text-[#1E1E1E] h-full thin-scrollbar",
          {
            "gap-2": loading,
            "gap-1": !loading,
          }
        )}
      >
        {loading ? (
          <LoadingSkeleton />
        ) : (
          filteredGenres.map((item: GenreI, idx: number) => (
            <li
              key={item?._id || idx}
              onClick={() => onClick(item._id)}
              className={classNames(
                "py-2 px-4 hover:bg-orange hover:text-white active:opacity-75 rounded-md text-[16px] font-normal cursor-pointer flex items-center justify-between gap-2",
                {
                  "bg-orange text-white": selectedGenreId === item._id, // Highlight the active genre
                }
              )}
            >
              <span className='w-[200px]'>{item?.name}</span>
              {selectedGenreId === item._id && (
                <div className='w-[18px] h-[18px] rounded-full bg-secondary-gray flex items-center justify-center'>
                  <div className='bg-orange w-3 h-3 rounded-full active:w-full active:h-full transition-all'></div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Genres;
