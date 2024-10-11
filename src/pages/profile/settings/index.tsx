import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Settings } from "@/components/views/profile/customs/main/customs";

const SettingsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Account Settings - Book Shop</title>
				<meta
					name="description"
					content="Update your account settings, preferences, and personal information at Book Shop."
				/>
				<meta
					name="keywords"
					content="account settings, user preferences, personal information, book shop"
				/>
				<link rel="canonical" href="/profile/settings" />
			</Helmet>
			<Settings />
		</>
	);
};

export default SettingsPage;
