import React from "react";
import Intro from "./intro";
import FeaturedCards from "./featured-cards";
import Statistics from "./statistics";

const Home: React.FC = () => {
	return (
		<>
			<Intro />
			<FeaturedCards />
			<Statistics />
		</>
	);
};

export default Home;
