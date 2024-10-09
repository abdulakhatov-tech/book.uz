import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { UserI } from "@/types";
import { formatPhoneNumber } from "@/helpers";
import useUsersService from "@/services/users";
import { Skeleton } from "@/components/ui/skeleton";

const UserInfo: React.FC = () => {
	const user: UserI | null = useAuthUser();
	const { useGetUserById } = useUsersService();
	const { isLoading, isError, data } = useGetUserById(user?._id as string);

	return (
		<div className="flex flex-col items-center gap-1 py-3 mt-2">
			{isLoading || isError ? (
				<Skeleton className="h-[20px] w-[90%] bg-skeleton-color" />
			) : (
				<h2 className="text-[18px] font-bold leading-[25.2px] text-black">
					{data?.surname || ""} {data?.name || "Guest"}
				</h2>
			)}
			{isLoading || isError ? (
				<Skeleton className="h-[20px] w-[80%] bg-skeleton-color mt-1" />
			) : (
				data?.phoneNumber && (
					<p
						className="text-[16px] font-semibold text-secondary-black"
						aria-label={`Phone number: ${formatPhoneNumber(data.phoneNumber)}`}
					>
						{formatPhoneNumber(data.phoneNumber)}
					</p>
				)
			)}
		</div>
	);
};

export default UserInfo;
