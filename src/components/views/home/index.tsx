import React from "react";
import Intro from "./intro";
import FeaturedCards from "./featured-cards";
import Statistics from "./statistics";
import NewAgeLibrary from "./new-age-library";
import RecentlyPublishedBooks from "./recently-published-books";

const Home: React.FC = () => {
	return (
		<>
			<Intro />
			<FeaturedCards />
			<NewAgeLibrary />
			<RecentlyPublishedBooks />
			<Statistics />
		</>
	);
};

export default Home;
