import { FC } from "react";
import { Helmet } from "react-helmet-async";
import CheckoutSuccessComponent from "@/components/views/cart/checkout/checkout-success";

const CheckoutSuccess: FC = () => {
	return (
		<>
			<Helmet>
				<title>Checkout Success - Book Shop</title>
				<meta name="description" content="Your order has been successfully placed. Thank you for shopping with us!" />
				<meta name="keywords" content="checkout success, order completed, book shop, thank you" />
				<link rel="canonical" href="/cart/checkout/success" />
			</Helmet>
			<CheckoutSuccessComponent />
		</>
	);
};

export default CheckoutSuccess;
