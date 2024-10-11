import CheckoutComponent from "@/components/views/cart/checkout";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const CheckoutPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Checkout - Book Shop</title>
				<meta
					name="description"
					content="Complete your purchase by reviewing your order and entering payment details."
				/>
				<meta name="keywords" content="checkout, order, book shop, payment" />
				<link rel="canonical" href="/cart/checkout" />
			</Helmet>
			<CheckoutComponent />
		</>
	);
};

export default CheckoutPage;
