import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IoIosStar } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";

import { formatPrice } from "@/helpers";
import { useAppDispatch } from "@/hooks/useRedux";
import useBookDetailsFeatures from "../../../../features";
import CommentsDropdown from "../../../comments-dropdown";
import { toggleAuthModalVisibility, toggleReviewDropdownVisibility } from "@/redux/slices/modals";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const Content: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch(); 
  const isAuthed = useAuthHeader()
  const { loading, book } = useBookDetailsFeatures();

  const handleComment = (bookId: string) => {
    if(!isAuthed) {
      dispatch(toggleAuthModalVisibility({
        open: true,
      }))

      return
    }

    dispatch(toggleReviewDropdownVisibility({
      open: true,
      bookId,
      reviewType: "create",
    }));
  };

  return (
    <div>
      {loading ? (
        <Skeleton className='bg-skeleton-color w-[100%] h-[36px] md:h-[40px]' />
      ) : (
        <h2 className='text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold leading-[28px] md:leading-[36.4px] text-secondary-black'>
          {book?.name}
        </h2>
      )}

      {loading ? (
        <Skeleton className='bg-skeleton-color w-[90%] md:w-[60%] h-[30px] mt-2 md:mt-4' />
      ) : (
        <Link to={`/authors/details/${book?.author?._id}`}>
          <h4 className='text-[16px] md:text-[18px] font-bold leading-[21.94px] text-blue mt-2 md:mt-4 underline'>
            {book?.author?.fullName}
          </h4>
        </Link>
      )}

      {loading ? (
        <div className='mt-2 flex items-center gap-4'>
          <Skeleton className='bg-skeleton-color w-[20%] md:w-[10%] h-[25px]' />
          <Skeleton className='bg-skeleton-color w-[30%] md:w-[15%] h-[25px]' />
          <Skeleton className='bg-skeleton-color w-[50%] md:w-[20%] h-[25px]' />
        </div>
      ) : (
        <div className='text-[14px] md:text-[16px] font-semibold text-gray flex items-center'>
          <IoIosStar className="text-orange text-[18px]" />
          <span className='ml-1'>
            {`${book?.rating}.0`}
          </span>
          <span className='ml-1'>
            ({book?.rateCount}{" "}
            {book?.rateCount > 9 ? t("book.people").toLowerCase() : t("book.person").toLowerCase()}){" "}
          </span>
          <CommentsDropdown>
            <span
              className='underline ml-4 cursor-pointer'
              onClick={() => handleComment(book?._id)}
            >
              {t("book.comment_on")}
            </span>
          </CommentsDropdown>
        </div>
      )}

      {loading ? (
        <Skeleton className='bg-skeleton-color w-[300px] h-[36px] md:h-[40px] mt-2 md:mt-4' />
      ) : (
        <h2 className='text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold leading-[28px] md:leading-[36.4px] text-orange mt-2 md:mt-4'>
          {formatPrice(book?.bookPrice)} {t("book.sum")}
        </h2>
      )}
    </div>
  );
};

export default Content;
