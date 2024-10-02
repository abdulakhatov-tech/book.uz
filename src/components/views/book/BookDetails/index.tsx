import { FC } from "react";

import Container from "@/layout/container";
import Section from "@/layout/section";
import { BookInfo, Images, InfoTabs } from "./customs";

const BookDetails: FC = () => {
	return (
		<Section id="book-details" className="py-4 border">
			<Container>
				<div className="grid sm:grid-cols-[minmax(250px,_1fr)_minmax(300px,_1.5fr)] gap-5">
					<Images />
					<BookInfo />
				</div>
				<InfoTabs />
			</Container>
		</Section>
	);
};

export default BookDetails;
