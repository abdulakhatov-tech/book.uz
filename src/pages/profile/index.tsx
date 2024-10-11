import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Profile } from "@/components/views";

const ProfilePage: FC = () => {
	return (
		<>
			<Helmet>
				<title>User Profile - Book Shop</title>
				<meta
					name="description"
					content="View and manage your profile, order history, and preferences at Book Shop."
				/>
				<meta
					name="keywords"
					content="user profile, account settings, order history, book shop, manage profile"
				/>
				<link rel="canonical" href="/profile" />
			</Helmet>
			<Profile />
		</>
	);
};

export default ProfilePage;
