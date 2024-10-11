import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import ProfileOrders from "@/components/views/profile/customs/main/customs/orders";

const ProfileOrdersPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Your Orders - Book Shop</title>
				<meta name="description" content="View your order history and track the status of your orders at Book Shop." />
				<meta name="keywords" content="orders, order history, track orders, user profile, book shop" />
				<link rel="canonical" href="/profile/orders" />
			</Helmet>
			<ProfileOrders />
		</>
	);
};

export default ProfileOrdersPage;
