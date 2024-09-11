import type { FC } from "react";
import { Outlet, useOutlet } from "react-router-dom";

const CartPage: FC = () => {
  const hasOutlet = useOutlet();

  return <div>
    {
      hasOutlet ? <Outlet /> : <h1>Cart</h1>
    }
  </div>;
};

export default CartPage;
