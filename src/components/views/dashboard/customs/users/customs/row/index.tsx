import React from "react";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { formatPhoneNumber } from "@/helpers";
import { UserRowPropsI } from "./interface";

const UserRow: React.FC<UserRowPropsI> = ({
	user,
	index,
	onPromote,
	canPromote,
}) => {
	const { t } = useTranslation();
	return (
		<TableRow key={user._id}>
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell className="flex items-center gap-2">
				<div className="w-[30px] h-[30px] rounded-full overflow-hidden">
					<PhotoProvider>
						<PhotoView src={user.profilePhoto}>
							<img
								src={user.profilePhoto}
								className="w-full h-full object-cover"
								alt={`${user.name} ${user.surname}`}
							/>
						</PhotoView>
					</PhotoProvider>
				</div>
				{user.name} {user.surname}
			</TableCell>
			<TableCell>
				{user.phoneNumber ? formatPhoneNumber(user.phoneNumber) : "..."}
			</TableCell>
			<TableCell>{user.email || "..."}</TableCell>
			<TableCell>{user.role?.toUpperCase() || "..."}</TableCell>
			<TableCell className="text-right">
				{user.role !== "owner" && (
					<Button
						variant="default"
						disabled={!canPromote}
						className="bg-[#3466e5]"
						onClick={onPromote}
					>
						{t("dashboard.users.promote")}
					</Button>
				)}
			</TableCell>
		</TableRow>
	);
};

export default UserRow;
