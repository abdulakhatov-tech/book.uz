import type { FC } from "react";
import { Authors, Genres, Languages, Price } from "./customs";

const Main: FC = () => {
	return (
		<aside className="hidden lg:block">
			<div className="flex flex-col gap-6">
				<Genres />
				<Price />
				<Languages />
				<Authors />
			</div>
		</aside>
	);
};

export default Main;
