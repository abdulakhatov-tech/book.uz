import type { FC } from "react";
import CartComponent from "@/components/views/cart";
import { Outlet, useOutlet } from "react-router-dom";

const CartPage: FC = () => {
	const hasOutlet = useOutlet();

	return <div>{hasOutlet ? <Outlet /> : <CartComponent />}</div>;
};

export default CartPage;
