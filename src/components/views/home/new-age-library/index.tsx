import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import MoreBooks from "@/components/common/more-books";

import { BookI } from "@/types";
import Section from "@/layout/section";
import { ProductCard } from "@/generic";
import Container from "@/layout/container";
import useNewAgeLibraryFeatures from "./features";
import BookSkeleton from "@/components/common/product-card-skeleton";

const NewAgeLibrary: React.FC = () => {
  const { t } = useTranslation();
  const { books, loading, booksCount, handleMoreBooks, handleLessBooks } =
    useNewAgeLibraryFeatures();

  return (
    <Section id='new-age-library' className='bg-[#F0F0F0] py-[24px] md:py-[22px] lg:py-[36px] xl:py-[40px]'>
      <Container>
        <Button className='bg-orange hover:bg-orange mb-8'>
          {t("home.new_age_library.title")}
        </Button>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:3 md:gap-4'>
          {loading
            ? Array.from({ length: 12 }).map((_, idx) => (
                <BookSkeleton key={idx} />
              ))
            : books?.map((book: BookI) => (
                <ProductCard key={book._id} {...book} />
              ))}
        </div>

        {books.length > 11 && (
          <div className='flex justify-center mt-8 gap-4'>
            <MoreBooks onClick={handleMoreBooks} />
            {booksCount > 11 && (
              <MoreBooks title='Less books' onClick={handleLessBooks} />
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default NewAgeLibrary;
