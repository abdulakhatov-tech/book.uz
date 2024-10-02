import { FC } from "react";

import { Actions, Content, Info } from "./customs";

const BookInfo: FC = () => {
	return (
		<div>
			<Content />
			<Info />
			<Actions />
		</div>
	);
};

export default BookInfo;
