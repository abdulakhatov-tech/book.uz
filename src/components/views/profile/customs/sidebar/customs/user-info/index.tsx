import React from "react";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// import { UserI } from "@/types";
import { formatPhoneNumber } from "@/helpers";
import useUsersService from "@/services/users";
import { Skeleton } from "@/components/ui/skeleton";

const UserInfo: React.FC = () => {
  // const user: UserI | null = useAuthUser();
  const { getUserById } = useUsersService();
  const { isLoading, isError, data: user } = getUserById;


  return (
    <div className='flex flex-col items-center gap-1 py-3'>
      {
        isLoading || isError ? <Skeleton className="h-[25px] w-full" /> : <h2 className='text-[18px] font-semibold leading-[25.2px] text-black'>
        {user?.name || "Guest"} {user?.surname || ""}
      </h2>
      }
      {
        isLoading || isError ? <Skeleton className="h-[25px] w-full" /> :
      user?.phoneNumber && (
        <p aria-label={`Phone number: ${formatPhoneNumber(user.phoneNumber)}`}>
          {formatPhoneNumber(user.phoneNumber)}
        </p>
      )}
    </div>
  );
};

export default UserInfo;
