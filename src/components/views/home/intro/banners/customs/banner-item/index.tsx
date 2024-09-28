import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { BannerI } from "@/types";
import { formatTitleToUrl } from "@/helpers";
import { CarouselItem } from "@/components/ui/carousel";


const BannerItem: FC<BannerI> = ({ link, title, imgUrl }) => {
  return (
    <CarouselItem>
      <NavLink to={`${link}/books/details/${formatTitleToUrl(title)}`}>
        <img
          src={imgUrl}
          alt={`Banner for ${title}`}
          loading='lazy'
          className='w-full h-auto aspect-[18/9] object-cover rounded-[8px]'
        />
      </NavLink>
    </CarouselItem>
  );
};

export default BannerItem;
