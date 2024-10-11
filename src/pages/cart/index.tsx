import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import CartComponent from "@/components/views/cart";
import { Outlet, useOutlet } from "react-router-dom";

const CartPage: FC = () => {
	const hasOutlet = useOutlet();

	return (
		<>
			<Helmet>
				{!hasOutlet ? (
					<>
						<title>Your Cart - Book Shop</title>
						<meta
							name="description"
							content="View and manage the items in your cart. Proceed to checkout when ready."
						/>
						<meta name="keywords" content="cart, books, checkout, book shop" />
						<link rel="canonical" href="/cart" />
					</>
				) : (
					// Optionally handle child route metadata if needed
					<title>Cart - Book Shop</title>
				)}
			</Helmet>
			<div>{hasOutlet ? <Outlet /> : <CartComponent />}</div>
		</>
	);
};

export default CartPage;
