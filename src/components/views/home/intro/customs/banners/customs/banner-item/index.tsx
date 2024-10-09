import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { BannerI } from "@/types";
import { CarouselItem } from "@/components/ui/carousel";

const BannerItem: FC<BannerI> = ({ title, imgUrl, link }) => {
  return (
    <CarouselItem>
      <NavLink to={`/books/details/${link}`}>
        <img
          src={imgUrl}
          alt={`Banner for ${title}`}
          loading='lazy'
          className='w-full h-auto aspect-[18/9] object-cover rounded-[8px] transition-all duration-500 hover:scale-[1.05]'
        />
      </NavLink>
    </CarouselItem>
  );
};

export default BannerItem;
