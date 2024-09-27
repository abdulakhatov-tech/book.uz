import type { FC } from "react";
import { NavLink } from "react-router-dom";

const CategoryItem: FC<{ id: string; name: string; onClose: () => void }> = ({
  id,
  name,
  onClose,
}) => (
  <li className='py-2 px-4 rounded-[4px] hover:bg-[#EF7F1A] hover:text-white active:opacity-75'>
    <NavLink
      to={`/books?page=1&limit=24&genreIds=${id}`}
      className='text-[16px] font-normal'
      onClick={onClose}
    >
      {name}
    </NavLink>
  </li>
);

export default CategoryItem;
