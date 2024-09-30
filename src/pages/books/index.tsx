import Books from "@/components/views/books";
import type { FC } from "react";
import { Outlet, useOutlet } from "react-router-dom";

const BooksPage: FC = () => {
	const hasOutlet = useOutlet();

	return <div>{hasOutlet ? <Outlet /> : <Books />}</div>;
};

export default BooksPage;
