import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosCamera } from "react-icons/io";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Section from "@/layout/section";
import useEditAuthorFeatures from "./features";
import { Button } from "@/components/ui/button";
import noImage from "@/assets/images/no-user.jpg";
import useAuthorsService from "@/services/authors";

const EditAuthor: React.FC = () => {
  const { t } = useTranslation();
  const { getAuthorById } = useAuthorsService();
  const { isLoading, isError, data } = getAuthorById;
  const {
    preview,
    formData,
    onInputChange,
    selectImageHandler,
    isFormValid,
    uploading,
    onSubmit,
  } = useEditAuthorFeatures();

  console.log(isLoading, isError, data);

  return (
    <Section id='edit-author'>
      <h2 className='text-[22px] text-black mb-4'>
        {t("dashboard.authors.edit")}
      </h2>

      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-3 gap-4'>
            <Label className='flex flex-col gap-2'>
              {t("dashboard.authors.full_name")}
              <Input
                type='text'
                name='fullName'
                value={formData.fullName}
                onChange={onInputChange}
              />
            </Label>
            <Label className='flex flex-col gap-2'>
              {t("dashboard.authors.date_of_birth")}
              <Input
                type='date'
                name='dateOfbirth'
                value={formData.dateOfbirth}
                onChange={onInputChange}
              />
            </Label>
            <Label className='flex flex-col gap-2'>
              {t("dashboard.authors.date_of_death")}
              <Input
                type='date'
                name='dateOfdeath'
                value={formData.dateOfdeath}
                onChange={onInputChange}
              />
            </Label>
          </div>

          <Label className='flex flex-col gap-2'>
            {t("dashboard.authors.biography")}
            <Textarea
              name='biography'
              rows={10}
              value={formData.biography}
              onChange={onInputChange}
            />
          </Label>

          <Label className='flex flex-col gap-2' id='image-upload'>
            {t("dashboard.authors.image")}
            <div className='flex items-center'>
              <div className='relative'>
                <img
                  src={preview || noImage}
                  className='object-cover w-[120px] h-[120px] rounded-full'
                  alt='Uploaded Preview'
                />
                <div className='flex items-center justify-center absolute -right-0 bottom-1 z-10 w-7 h-7 rounded-full overflow-hidden bg-[#F6F6F6] custom-shadow'>
                  <IoIosCamera className='text-[22px] text-[#6C6C6C]' />
                </div>
              </div>
              <Input
                type='file'
                name='image-upload'
                onChange={selectImageHandler}
                className='hidden'
              />
            </div>
          </Label>
        </div>
        <Button
          disabled={!isFormValid() || uploading}
          className='mt-6 bg-[#BC8E5B]'
        >
          {uploading
            ? t("dashboard.authors.uploading")
            : t("dashboard.authors.edit")}
        </Button>
      </form>
    </Section>
  );
};

export default EditAuthor;
