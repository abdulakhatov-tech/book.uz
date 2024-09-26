import React from "react";
import { useTranslation } from "react-i18next";

import Section from "@/layout/section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectAuthor,
  SelectBookState,
  SelectCoverType,
  SelectGenre,
  SelectLanguage,
  SelectPublishedYear,
  UploadImage,
} from "./customs";
import useCreateBookFeatures from "./features";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const CreateBook: React.FC = () => {
  const { t } = useTranslation();
  const { bookId } = useParams();
  const {
    formData,
    onInputChange,
    selectImageHandler,
    preview,
    uploading,
    isFormValid,
    onSubmit,
    loading,
  } = useCreateBookFeatures();

  const loadingState = loading && bookId;

  const loadingFn = (className?: string) => (
    <Skeleton className={`${className ? className : "w-full h-[40px]"}`} />
  );

  return (
    <Section id='create-book'>
      <h2 className='text-[22px] text-black mb-4'>
        {bookId ? t("dashboard.books.edit") : t("dashboard.books.create")}
      </h2>

      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.name")}
            {loadingState ? (
              loadingFn()
            ) : (
              <Input
                type='text'
                name='name'
                value={formData.name}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.genre")}
            {loadingState ? (
              loadingFn()
            ) : (
              <SelectGenre value={formData.genre} onChange={onInputChange} />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.author")}
            {loadingState ? (
              loadingFn()
            ) : (
              <SelectAuthor value={formData.author} onChange={onInputChange} />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.amount")}
            {loadingState ? (
              loadingFn()
            ) : (
              <Input
                type='number'
                name='amount'
                value={formData.amount || ""}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.book_price")}
            {loadingState ? (
              loadingFn()
            ) : (
              <Input
                type='number'
                name='bookPrice'
                value={formData.bookPrice || ""}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.language")}
            {loadingState ? (
              loadingFn()
            ) : (
              <SelectLanguage
                value={formData.language}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.cover")}
            {loadingState ? (
              loadingFn()
            ) : (
              <SelectCoverType
                value={formData.cover}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.discount")} (optional)
            {loadingState ? (
              loadingFn()
            ) : (
              <Input
                type='number'
                name='discount'
                placeholder='10'
                value={formData.discount || ""}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.number_of_pages")}
            {loadingState ? (
              loadingFn()
            ) : (
              <Input
                type='number'
                name='numberOfPages'
                value={formData.numberOfPages || ""}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.state")}
            {loadingState ? (
              loadingFn()
            ) : (
              <SelectBookState
                value={formData.state}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.year")}
            {loadingState ? (
              loadingFn()
            ) : (
              <SelectPublishedYear
                value={formData.year}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.books.barcode")}
            {loadingState ? (
              loadingFn()
            ) : (
              <Input
                type='string'
                name='barcode'
                placeholder='978-9910-9289-1-8'
                value={formData.barcode}
                onChange={onInputChange}
              />
            )}
          </Label>

          <Label className='flex flex-col gap-2 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4'>
            {t("dashboard.books.description")}
            {loadingState ? (
              loadingFn("w-full h-[180px]")
            ) : (
              <Textarea
                name='description'
                rows={8}
                value={formData.description}
                onChange={onInputChange}
              />
            )}
          </Label>
        </div>

        <div className='grid grid-cols-1 2xl:grid-cols-[1fr_3fr] gap-4 mt-4'>
          <Label className='flex flex-col gap-2' id='image-upload'>
            {t("dashboard.authors.image")}
            {loadingState ? (
              loadingFn("w-[160px] h-[190px]")
            ) : (
              <UploadImage
                preview={preview.thumbnail}
                selectImageHandler={(e) => selectImageHandler(e, "thumbnail")}
              />
            )}
          </Label>

          <div className='flex flex-wrap gap-8'>
            <Label className='flex flex-col gap-2' id='image-upload'>
              {t("dashboard.books.additional_images")}
              {loadingState ? (
                loadingFn("w-[160px] h-[190px]")
              ) : (
                <UploadImage
                  preview={preview.additionalImage1}
                  selectImageHandler={(e) =>
                    selectImageHandler(e, "additionalImage1")
                  }
                />
              )}
            </Label>
            <Label className='pt-5' id='image-upload'>
              {loadingState ? (
                loadingFn("w-[160px] h-[190px]")
              ) : (
                <UploadImage
                  preview={preview.additionalImage2}
                  selectImageHandler={(e) =>
                    selectImageHandler(e, "additionalImage2")
                  }
                />
              )}
            </Label>
            <Label className='pt-5' id='image-upload'>
              {loadingState ? (
                loadingFn("w-[160px] h-[190px]")
              ) : (
                <UploadImage
                  preview={preview.additionalImage3}
                  selectImageHandler={(e) =>
                    selectImageHandler(e, "additionalImage3")
                  }
                />
              )}
            </Label>
            <Label className='pt-5' id='image-upload'>
              {loadingState ? (
                loadingFn("w-[160px] h-[190px]")
              ) : (
                <UploadImage
                  preview={preview.additionalImage4}
                  selectImageHandler={(e) =>
                    selectImageHandler(e, "additionalImage4")
                  }
                />
              )}
            </Label>
          </div>
        </div>

        {loadingState ? (
          loadingFn("w-[150px] h-[40px] mt-6")
        ) : (
          <Button
            disabled={!isFormValid() || uploading}
            className='mt-6 bg-[#BC8E5B] w-[150px]'
          >
            {uploading
              ? `${t("dashboard.authors.uploading")}...`
              : bookId
              ? t("dashboard.books.edit")
              : t("dashboard.books.create")}
          </Button>
        )}
      </form>
    </Section>
  );
};

export default CreateBook;
