import React from "react";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Section from "@/layout/section";
import Container from "@/layout/container";

import { BookI } from "@/types";
import useRecentlyPublishedBooksFeatures from "./features";
import RecentlyPublishedBookCard from "@/generic/recently-published-book-card";
import RecentlyPublishedCardSkeleton from "@/components/common/recently-published-card-skeleton";

const RecentlyPublishedBooks: React.FC = () => {
  const { t } = useTranslation();
  const { books, loading } = useRecentlyPublishedBooksFeatures();

  return (
    <Section
      id='newly-published-books'
      className='bg-white py-[16px] sm:py-[22px] md:py-[28px]'
    >
      <Container>
        <h3 className='text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]  font-semibold leading-[34.13px] text-black'>
          {t("home.newly_published_books.title")}
        </h3>

        <Carousel
          plugins={[Autoplay({ delay: 14000, stopOnInteraction: false })]}
          className='relative'
        >
          {loading ? (
            <div className='overflow-x-hidden pt-[40px] sm:pt-[50px] md:pt-[66px]'>
              <div className='w-fit flex items-center gap-8'>
                <RecentlyPublishedCardSkeleton />
                <RecentlyPublishedCardSkeleton />
                <RecentlyPublishedCardSkeleton />
                <RecentlyPublishedCardSkeleton />
              </div>
            </div>
          ) : (
            <CarouselContent className='-ml-4 pt-[40px] sm:pt-[50px] md:pt-[66px]'>
              {books?.map((book: BookI) => (
                <CarouselItem
                  key={book._id}
                  className='basis-[100%] sm:basis-[80%] md:basis-[60%] lg:basis-[40%] lg:mr-[14px]'
                >
                  <RecentlyPublishedBookCard {...book} />
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
          <div className='absolute -top-5 right-8'>
            <CarouselPrevious></CarouselPrevious>
            <CarouselNext className='-right-6'></CarouselNext>
          </div>
        </Carousel>
      </Container>
    </Section>
  );
};

export default RecentlyPublishedBooks;
