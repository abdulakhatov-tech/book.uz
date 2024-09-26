import React from "react";
import { IoIosCamera } from "react-icons/io";

import { Input } from "@/components/ui/input";
import { UploadImagePropsI } from "./interface";
import noImage from "@/assets/images/no-image.png";

const UploadImage: React.FC<UploadImagePropsI> = ({
  selectImageHandler,
  preview,
}) => {
  return (
    <div className='flex items-center'>
      <div className='relative'>
        <img
          src={preview || noImage}
          className='object-cover w-[160px] h-[190px] rounded-lg'
          alt='Uploaded Preview'
        />
        <div className='flex items-center justify-center absolute -right-4 bottom-2 z-10 w-10 h-10 rounded-full overflow-hidden bg-[#F6F6F6] custom-shadow'>
          <IoIosCamera className='text-[28px] text-[#6C6C6C]' />
        </div>
      </div>
      <Input
        type='file'
        name='image-upload'
        onChange={selectImageHandler}
        className='hidden'
      />
    </div>
  );
};

export default UploadImage;
