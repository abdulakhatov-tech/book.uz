import { useEffect, type FC } from "react";

import Section from "@/layout/section";
import Container from "@/layout/container";
import { useAppDispatch } from "@/hooks/useRedux";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Aside, BookList, Toolbar } from "./customs";
import { setInitialColumnLimit } from "@/redux/slices/column-counter";

const Books: FC = () => {
	const dispatch = useAppDispatch();
	const md = useMediaQuery("(min-width: 767px)");

	useEffect(() => {
		const handleResize = () => {
			dispatch(setInitialColumnLimit());
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [md]);

	return (
		<Section id="books" className="pt-[8px] pb-3 md:pb-[20px]">
			<Container>
				<div className="w-full grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-6">
					<Aside />
					<div className="flex flex-col gap-6">
						<Toolbar />
						<BookList />
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default Books;
