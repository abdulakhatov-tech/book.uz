import React from "react";
import { useTranslation } from "react-i18next";

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { UserI } from "@/types";
import useUsersFeatures from "./features";
import { LoadingRows, UserRow } from "./customs";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const AllUsers: React.FC = () => {
	const { t } = useTranslation();
	const currentUser: UserI | null = useAuthUser();
	const { useGetAllUsers, promoteUserToAdminHandler } = useUsersFeatures();

	const { isLoading, isError, data: users } = useGetAllUsers();

	// Filter users with admin or owner role
	const allUsers = users?.filter((user: UserI) => user.role === "user") || [];

	const canPromote =
		currentUser?.role === "owner" || currentUser?.role === "admin";

	// Handle error state
	if (isError) {
		return <p className="text-red-500 text-center">{t("error.general")}</p>;
	}

	return (
		<div>
			<h2 className="text-[22px] text-black mb-4">
				{t("dashboard.users.all_users")}
			</h2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">№</TableHead>
						<TableHead>{t("dashboard.users.full_name")}</TableHead>
						<TableHead>{t("dashboard.users.phone_number")}</TableHead>
						<TableHead>{t("dashboard.users.email")}</TableHead>
						<TableHead>{t("dashboard.users.role")}</TableHead>
						<TableHead className="text-right">
							{t("dashboard.users.actions")}
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{isLoading ? (
						<LoadingRows />
					) : (
						allUsers.map((user: UserI, idx: number) => (
							<UserRow
								key={user._id}
								user={user}
								index={idx}
								onPromote={() => promoteUserToAdminHandler(user._id)}
								canPromote={canPromote}
							/>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default AllUsers;
