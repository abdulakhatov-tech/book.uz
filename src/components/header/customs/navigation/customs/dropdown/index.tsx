import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Genres from "@/components/views/home/intro/genres";
import useGenresService from "@/services/genres";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { GenreI } from "@/types";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { toggleCategoryDropdownVisibility } from "@/redux/slices/modals";

const CategoryDropdown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { genres } = useGenresService();
  const isOnline = useOnlineStatus();
  const { categoryDropdownVisibility } = useAppSelector((state) => state.modal);

  const { isLoading, isError, data: genresData } = genres;

  return (
    <Popover open={categoryDropdownVisibility}>
      <PopoverTrigger className='lg:hidden'>{children}</PopoverTrigger>
      <PopoverContent className='w-screen h-screen overflow-y-auto'>
        <div className='block w-full h-[75vh] bg-[#F6F6F6] rounded-[8px] overflow-y-auto py-1'>
          <ul className='flex flex-col text-[#1E1E1E]'>
            {!isOnline || isLoading || isError
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} className='p-6 w-full bg-[#e5e0e0]' />
                ))
              : genresData.map(({ _id, name }: GenreI) => (
                  <li
                    key={_id}
                    className='py-2 px-4 hover:bg-[#EF7F1A] hover:text-white active:opacity-75'
                  >
                    <NavLink
                      to={`/books?page=1&limit=24&genreIds=${_id}`}
                      className='text-[16px] font-normal'
                      onClick={() =>
                        dispatch(toggleCategoryDropdownVisibility(false))
                      }
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryDropdown;
