import React from "react";

import Section from "@/layout/section";
import Container from "@/layout/container";
import { Banners, Genres } from "./customs";

const Intro: React.FC = () => {
	return (
		<Section id="intro" className="pt-[8px] pb-3 md:pb-[20px]">
			<Container>
				<div className="flex gap-[24px] h-full max-h-[448px]">
					<Genres />
					<Banners />
				</div>
			</Container>
		</Section>
	);
};

export default Intro;
