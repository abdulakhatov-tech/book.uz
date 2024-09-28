import type { FC } from "react";
import { NavLink } from "react-router-dom";

interface GenreItemPropsI {
  _id: string;
  name: string;
}

const GenreItem: FC<GenreItemPropsI> = ({ _id, name }) => {
  return (
    <li className='py-2 px-4 hover:bg-orange hover:text-white active:opacity-75 rounded-md'>
      <NavLink
        to={`/books?page=1&limit=24&genreIds=${_id}`}
        className='text-[16px] font-normal'
      >
        {name}
      </NavLink>
    </li>
  );
};

export default GenreItem;
