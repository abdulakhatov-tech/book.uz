import React from "react";

import useProfileImageFeatures from "./features";
import { Skeleton } from "@/components/ui/skeleton";
import camera from "@/assets/icons/camera-to-take-photos.svg";
import useUsersService from "@/services/users";

const ProfileImage: React.FC = () => {
  const { preview, uploading, handleFileChange } = useProfileImageFeatures();
  const { getUserById } = useUsersService();

  const {isLoading, isError, data: user} = getUserById;

  return (
    <form className="flex flex-col items-center">
      <div className="relative">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden custom-shadow">
          {isLoading || isError || !user || uploading ? (
            <Skeleton className="w-full h-full object-cover" />
          ) : (
            <img
              src={preview || user?.profilePhoto}
              alt="User profile"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <label
          htmlFor="image"
          className="flex items-center justify-center absolute -right-1 bottom-0 z-10 w-7 h-7 rounded-full overflow-hidden bg-[#F6F6F6] custom-shadow"
          aria-label="Change profile image"
        >
          <img src={camera} alt="Camera icon" className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image"
            name="image"
            onChange={handleFileChange}
            title="Upload a new profile image"
            aria-labelledby="image"
          />
        </label>
      </div>
      {/* Optional: Display error message if any */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </form>
  );
};

export default ProfileImage;
