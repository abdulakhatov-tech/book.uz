import React from "react";
import Intro from "./intro";
import FeaturedCards from "./featured-cards";
import Statistics from "./statistics";
import NewAgeLibrary from "./new-age-library";

const Home: React.FC = () => {
	return (
		<>
			<Intro />
			<FeaturedCards />
			<NewAgeLibrary />
			<Statistics />
		</>
	);
};

export default Home;
