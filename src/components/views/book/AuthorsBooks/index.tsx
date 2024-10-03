import { FC } from "react";
import { useTranslation } from "react-i18next";

import useBooksService from "@/services/books";
import useBookDetailsFeatures from "../BookDetails/features";
import ProductsCarousel from "@/components/common/products-carousel";

const AuthorsBooks: FC = () => {
  const { t } = useTranslation();
  const { book } = useBookDetailsFeatures();
  const { useGetAllBooks } = useBooksService();

  const authorBooks = useGetAllBooks({ authorIds: book?.author?._id });

  return (
    <ProductsCarousel
      title={t("book.authors_books")}
      books={authorBooks}
      className='bg-white py-4'
    />
  );
};

export default AuthorsBooks;
