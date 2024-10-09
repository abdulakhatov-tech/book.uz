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
import useAdminsFeatures from "./features";
import { LoadingRows, UserRow } from "./customs";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Admins: React.FC = () => {
	const { t } = useTranslation();
	const currentUser: UserI | null = useAuthUser();
	const { useGetAllUsers, demoteUserToUserHandler } = useAdminsFeatures();

	const { isLoading, isError, data: users } = useGetAllUsers();

	// Filter users with admin or owner role
	const admins =
		users?.filter(
			(user: UserI) => user.role === "owner" || user.role === "admin",
		) || [];

	const canDemote = currentUser?.role === "owner";

	// Handle error state
	if (isError) {
		return <p className="text-red-500 text-center">{t("error.general")}</p>;
	}

	return (
		<div>
			<h2 className="text-[22px] text-black mb-4">
				{t("dashboard.users.admins")}
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
						admins.map((user: UserI, idx: number) => (
							<UserRow
								key={user._id}
								user={user}
								index={idx}
								onDemote={() => demoteUserToUserHandler(user._id)}
								canDemote={canDemote}
							/>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default Admins;
