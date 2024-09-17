import React from "react";
import Intro from "./intro";
import FeaturedCards from "./featured-cards";

const Home: React.FC = () => {
	return (
		<>
			<Intro />
			<FeaturedCards />
		</>
	);
};

export default Home;
