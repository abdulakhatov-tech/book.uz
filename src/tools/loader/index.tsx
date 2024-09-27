import React from "react";
import { PiSpinnerBold } from "react-icons/pi";

const Loader: React.FC = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<PiSpinnerBold className="spin text-[36px]" />
		</div>
	);
};

export default Loader;
