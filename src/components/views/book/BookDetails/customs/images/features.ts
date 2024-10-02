import { BookI } from "@/types";
import { useEffect, useMemo, useState } from "react";

import useBookDetailsFeatures from "../../features";

const useImagesFeatures = () => {
    const { loading, book }: { loading: boolean; book: BookI } =
    useBookDetailsFeatures();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [preloadedImgUrl, setPreloadedImgUrl] = useState<string>(
      book?.imgUrl || ""
    );
  
    const images = useMemo(() => {
      return book?.additionalImages?.length
        ? [book?.imgUrl, ...book.additionalImages]
        : [book?.imgUrl];
    }, [book?.imgUrl, book?.additionalImages]);
  
    useEffect(() => {
      if (book?.imgUrl) {
        const img = new Image();
        img.src = book.imgUrl;
        img.onload = () => setPreloadedImgUrl(book.imgUrl);
      }
    }, [book?.imgUrl]);
  
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = preloadedImgUrl;
    };
  
    const handleImageClick = (index: number) => setActiveIndex(index);

  return {
    loading, book, images, activeIndex, handleImageError, handleImageClick
  };
};

export default useImagesFeatures;
