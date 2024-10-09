import type { FC } from "react";
import { useTranslation } from "react-i18next";

import Section from "@/layout/section";
import Container from "@/layout/container";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Banner } from "./customs";
import bookIcon from "@/assets/icons/books-icon.svg";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useSectionLazyLoader from "@/services/section-lazy-loader";

const Statistics: FC = () => {
  const { t } = useTranslation();
  const isOnline = useOnlineStatus();
  const { statistics, statisticsRef } = useSectionLazyLoader();

  const { isLoading, isError, data } = statistics;
  const loading = !isOnline || isLoading || isError;

  return (
    <Section
      ref={statisticsRef}
      id='statistics'
      className='py-[30px] md:py-[35px] lg:py-[40px]'
    >
      <Container>
        <Banner />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px] md:mt-[35px] lg:mt-[40px]'>
          {loading ? (
            Array.from({ length: 3 }).map((_: any, idx: number) => (
              <Skeleton
                key={idx}
                className='bg-skeleton-color w-full h-[120px] sm:h-[150px] md:h-[170px]'
              />
            ))
          ) : (
            <>
              <Card className='py-5 md:py-7 px-4 md:px-6 bg-[rgba(214,89,17,0.1)] flex items-center gap-4 md:gap-6 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 cursor-pointer'>
                <div className='w-[56px] h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-[50%] bg-white flex items-center justify-center'>
                  <img
                    src={bookIcon}
                    alt={`books icon`}
                    className='w-[30px] h-[30px] md:w-[36px] md:h-[36px] lg:w-[44px] lg:h-[44px]'
                  />
                </div>
                <div className='max-w-[70%]'>
                  <h3 className='text-[24px] md:text-[32px] font-semibold'>
                    {data?.totalNamedBooks}
                  </h3>
                  <p className='text-[14px] md:text-[18px] text-gray-600'>
                    {t("home.statistics.description_1")}
                  </p>
                </div>
              </Card>

              <Card className='py-5 md:py-7 px-4 md:px-6 bg-[rgba(214,89,17,0.1)] flex items-center gap-4 md:gap-6 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 cursor-pointer'>
                <div className='w-[56px] h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-[50%] bg-white flex items-center justify-center'>
                  <img
                    src={bookIcon}
                    alt={`books icon`}
                    className='w-[30px] h-[30px] md:w-[36px] md:h-[36px] lg:w-[44px] lg:h-[44px]'
                  />
                </div>
                <div className='max-w-[70%]'>
                  <h3 className='text-[24px] md:text-[32px] font-semibold'>
                    {data?.totalBooks}
                  </h3>
                  <p className='text-[14px] md:text-[18px] text-gray-600'>
                    {t("home.statistics.description_2")}
                  </p>
                </div>
              </Card>

			  <Card className='py-5 md:py-7 px-4 md:px-6 bg-[rgba(214,89,17,0.1)] flex items-center gap-4 md:gap-6 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 cursor-pointer'>
                <div className='w-[56px] h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-[50%] bg-white flex items-center justify-center'>
                  <img
                    src={bookIcon}
                    alt={`books icon`}
                    className='w-[30px] h-[30px] md:w-[36px] md:h-[36px] lg:w-[44px] lg:h-[44px]'
                  />
                </div>
                <div className='max-w-[70%]'>
                  <h3 className='text-[24px] md:text-[32px] font-semibold'>
                    {data?.totalBranches}
                  </h3>
                  <p className='text-[14px] md:text-[18px] text-gray-600'>
                    {t("home.statistics.description_3")}
                  </p>
                </div>
              </Card>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default Statistics;
