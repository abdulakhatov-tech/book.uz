import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const Logout: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const signOut = useSignOut();

	const handleLogout = () => {
		signOut();
		navigate("/");
		toast({
			title: "You have been logged out!",
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<div
					className="py-5 flex items-center gap-2 hover:text-[crimson]"
					aria-label={t("profile.nav.logout")}
				>
					<IoIosLogOut
						className="text-[18px] md:text-[22px]"
						aria-hidden="true"
					/>
					{t("profile.nav.logout")}
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[260px] sm:w-[300px] rounded-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>{t("profile.logout.title")}?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex">
					<AlertDialogCancel className="w-full">
						{t("profile.logout.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleLogout}
						className="hover:bg-[crimson] bg-[crimson] text-white w-full"
					>
						{t("profile.logout.ok")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Logout;
