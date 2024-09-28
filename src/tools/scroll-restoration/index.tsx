import { useEffect } from "react";

const ScrollRestoration = () => {
	useEffect(() => {
		// Restore scroll position on component mount
		const scrollPosition = sessionStorage.getItem("scrollPosition");
		if (scrollPosition) {
			window.scrollTo(0, parseInt(scrollPosition, 10));
		}

		// Save scroll position before the component unmounts
		const handleBeforeUnload = () => {
			sessionStorage.setItem("scrollPosition", String(window.scrollY));
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		// Cleanup the event listener on unmount
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return null;
};

export default ScrollRestoration;
