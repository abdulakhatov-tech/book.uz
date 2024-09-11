import type { FC } from "react";
import { Outlet, useOutlet } from "react-router-dom";

const BooksPage: FC = () => {
	const hasOutlet = useOutlet();

	return <div>{hasOutlet ? <Outlet /> : <h1>BooksPage</h1>}</div>;
};

export default BooksPage;
